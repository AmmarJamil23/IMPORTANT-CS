import time
import asyncio
import requests
import psutil
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from threading import Semaphore

app = FastAPI()

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
    if not semaphore.acquire(blocking=False):
        raise HTTPException(status_code=429, detail="Server busy")

    start_time = time.time()
    mem_before = get_memory_usage()

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": req.prompt,
                "stream": False,
                "options": {
                    "num_predict": req.max_tokens
                }
            },
            timeout=120
        )

        if response.status_code != 200:
            raise HTTPException(status_code=500, detail="Ollama error")

        data = response.json()
        output_text = data.get("response", "")

    finally:
        semaphore.release()

    end_time = time.time()
    mem_after = get_memory_usage()

    return {
        "response": output_text,
        "metrics": {
            "latency_seconds": round(end_time - start_time, 4),
            "memory_before": mem_before,
            "memory_after": mem_after
        }
    }
