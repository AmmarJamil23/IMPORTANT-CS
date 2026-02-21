Local RAG Based LLM Service using FastAPI, FAISS, SentenceTransformers, and Ollama
Overview

This project is a local Retrieval Augmented Generation (RAG) based LLM service. It allows a user to send a question through an API, retrieve relevant documents using vector search, and generate a grounded answer using a locally running Large Language Model.

The system runs fully on a local machine without requiring any external cloud APIs or GPU. It uses FAISS for fast similarity search, SentenceTransformers for embeddings, FastAPI for the API layer, and Ollama for running the LLM.

This project demonstrates how modern production LLM systems work internally.

What problem this project solves

Large Language Models generate answers based only on their training data. They do not know your custom documents unless you provide that information.

This project solves that problem using Retrieval Augmented Generation.

The system first retrieves relevant documents from a local knowledge base and then gives those documents as context to the LLM. This allows the LLM to generate more accurate and grounded answers.

System Architecture

The system has three main components.

Retrieval Layer
This layer converts documents into vector embeddings and stores them in a FAISS index. It allows fast similarity search.

Orchestration Layer
This layer is implemented using FastAPI. It receives user requests, retrieves relevant documents, constructs an augmented prompt, sends it to the LLM, and returns the response.

Generation Layer
This layer uses Ollama to run the LLM locally and generate responses.

Project Structure
llm_service/
│
├── app.py
├── rag.py
├── requirements.txt
└── venv/

app.py contains the FastAPI server and inference pipeline.

rag.py contains the retrieval system using embeddings and FAISS.

How the system works

Step 1: System startup

When the FastAPI server starts, the SimpleRAG class initializes. It loads the embedding model, converts documents into embeddings, and builds the FAISS index.

This step happens only once.

Step 2: User sends request

The user sends a POST request to the /generate endpoint with a prompt.

Example:

{
  "prompt": "What are transformers?",
  "max_tokens": 50
}

Step 3: Query embedding and retrieval

The system converts the user query into a vector using SentenceTransformers.

It then searches the FAISS index to find the most relevant documents.

Step 4: Prompt augmentation

The retrieved documents are combined with the user question to create an augmented prompt.

Example:

Use the following context:
Transformers use self attention mechanisms.

Question:
What are transformers?

Step 5: LLM generation

The augmented prompt is sent to Ollama, which runs the LLM locally.

The LLM generates a grounded response using the provided context.

Step 6: Response and metrics

The system returns the generated response along with performance metrics such as latency and memory usage.

Technologies used

FastAPI
Used to build the REST API server.

SentenceTransformers
Used to convert text into embeddings.

FAISS
Used for fast vector similarity search.

Ollama
Used to run the LLM locally.

NumPy
Used for numerical operations.

psutil
Used to measure memory usage.

Requests
Used to communicate with Ollama.

Installation

Step 1: Clone the project

git clone <repository_url>
cd llm_service

Step 2: Create virtual environment

python3 -m venv venv
source venv/bin/activate

Step 3: Install dependencies

pip install fastapi uvicorn sentence-transformers faiss-cpu numpy psutil requests

Step 4: Install Ollama

Download and install Ollama from the official website.

Pull the model:

ollama pull qwen2.5:3b-instruct
Running the project

Step 1: Start Ollama

ollama run qwen2.5:3b-instruct

Step 2: Start FastAPI server

uvicorn app:app --reload

Server will run at:

http://localhost:8000
Testing the API

Using curl:

curl -X POST http://localhost:8000/generate \
-H "Content-Type: application/json" \
-d '{"prompt": "What are transformers?", "max_tokens": 50}' | python -m json.tool
Example output
{
  "response": "Transformers use self attention mechanisms...",
  "metrics": {
    "total_latency_seconds": 2.1345,
    "retrieval_latency_seconds": 0.0123,
    "generation_latency_seconds": 2.1000,
    "memory_before": {...},
    "memory_after": {...}
  }
}
Performance observations

Retrieval latency is very low because FAISS is optimized for fast search.

Generation latency is higher because LLM inference is computationally intensive.

Memory usage increases during generation due to model execution.

Key learning outcomes

Understanding how embeddings work.

Understanding vector search using FAISS.

Understanding Retrieval Augmented Generation.

Understanding LLM inference pipeline.

Understanding FastAPI based inference service.

Understanding latency and memory measurement.

Understanding local LLM deployment.

Future improvements

Add persistent document storage.

Add database integration.

Add async inference support.

Add Docker containerization.

Add distributed deployment.