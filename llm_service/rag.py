import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import time

class SimpleRAG:
    def __init__(self):
        self.model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
        self.documents = [
            "Tranformers use self-attention mechanisms.",
            "RNNs process sequences sequentially",
            "CNNs are used in computer vision tasks.",
            "Large language models generate text autoregressively."
        ]

        self.embeddings = self.model.encode(self.documents)
        self.index = faiss.IndexFlatL2(self.embeddings.shape[1])
        self.index.add(np.array(self.embeddings).astype("float32"))

    
    def retrieve(self, query, top_k=2):
        start = time.time()
        query_embedding = self.model.encode([query])
        D, I = self.index.search(np.array(query_embedding).astype("float32"), top_k)
        retrieved_docs = [self.documents[i] for i in I[0]]
        end = time.time()

        return {
            "docs": retrieved_docs,
            "latency": round(end - start, 4)
        }