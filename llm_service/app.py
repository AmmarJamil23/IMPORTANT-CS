import time
import asyncio
import requests
import psutil
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from threading import Semaphore
from rag import SimpleRAG

app = FastAPI()

# Initialize RAG system at startup (loads embeddings, FAISS index, etc)
rag = SimpleRAG()

# Limit concurrent inferences
MAX_CONCURRENT_REQUESTS = 2
semaphore = Semaphore(MAX_CONCURRENT_REQUESTS)

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:3b-instruct"


class InferenceRequest(BaseModel):
    prompt: str
    max_tokens: int = 200


def get_memory_usage():
    mem = psutil.virtual_memory()
    return {
        "total_gb": round(mem.total / (1024**3), 4),
        "used_gb": round(mem.used / (1024**3), 4),
        "available_gb": round(mem.available / (1024**3), 4),
        "percent": mem.percent
    }


@app.post("/generate")
async def generate(req: InferenceRequest):

    # Admission control
    if not semaphore.acquire(blocking=False):
        raise HTTPException(status_code=429, detail="Server busy")

    request_start_time = time.time()
    mem_before = get_memory_usage()

    try:

        # =============================
        # Step 1: Retrieval phase
        # =============================
        retrieval_start = time.time()

        retrieval_result = rag.retrieve(req.prompt)

        retrieval_end = time.time()
        retrieval_latency = retrieval_end - retrieval_start

        # Construct augmented prompt
        augmented_prompt = (
            "Use the following context to answer:\n\n"
            + "\n".join(retrieval_result["docs"])
            + "\n\nQuestion:\n"
            + req.prompt
        )

        # =============================
        # Step 2: Generation phase (LLM call)
        # =============================
        generation_start = time.time()

        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": augmented_prompt,
                "stream": False,
                "options": {
                    "num_predict": req.max_tokens
                }
            },
            timeout=120
        )

        generation_end = time.time()
        generation_latency = generation_end - generation_start

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Ollama error")

        data = response.json()
        output_text = data.get("response", "")

    finally:
        semaphore.release()

    request_end_time = time.time()
    mem_after = get_memory_usage()

    total_latency = request_end_time - request_start_time

    return {
        "response": output_text,

        "retrieval": {
            "documents": retrieval_result["docs"],
            "scores": retrieval_result.get("scores", []),
            "latency_seconds": round(retrieval_latency, 4)
        },

        "metrics": {
            "total_latency_seconds": round(total_latency, 4),
            "generation_latency_seconds": round(generation_latency, 4),
            "retrieval_latency_seconds": round(retrieval_latency, 4),
            "memory_before": mem_before,
            "memory_after": mem_after
        }
    }
