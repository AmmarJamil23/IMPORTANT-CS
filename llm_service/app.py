import time
import asyncio
import requests
import psutil
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from threading import Semaphore

app = FastAPI()

# Limit concurrent inferences
MAX_CONCURRENT_REQUESTS = 1
semaphore = Semaphore(MAX_CONCURRENT_REQUESTS)

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:3b-instruct"

class InferenceRequest(BaseModel):
    prompt: str
    max_token: int = 200


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
        raise HTTPException(status_code=429, ddetail="Server busy")
    
    start_time = time.time()
    mem_before = get_memory_usage()