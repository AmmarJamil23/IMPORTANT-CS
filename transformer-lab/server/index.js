import express from 'express';
import cors from 'cors';
import { getEmbeddings } from './utils/embeddings.js';
import { computeAttentionScores, softmax, applyAttention } from './utils/math.js';
import { QKVProjections } from './utils/projections.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Create Q, K, V projections (weights initialized once)
const projections = new QKVProjections(8); // 8 = embedding dimension

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.post('/api/calculate-attention', (req, res) => {
  const { tokens } = req.body;
  
  if (!tokens || !Array.isArray(tokens)) {
    return res.status(400).json({ error: 'Invalid tokens' });
  }
  
  // Step 1: Get embeddings
  const embeddings = getEmbeddings(tokens);
  
  // Step 2: Project to Q, K, V
  const { Q, K, V } = projections.project(embeddings);
  
  // Step 3: Compute attention scores (Q × K^T)
  const scores = computeAttentionScores(Q, K);
  
  // Step 4: Apply softmax
  const attentionWeights = softmax(scores);
  
  // Step 5: Apply attention to values (weights × V)
  const output = applyAttention(attentionWeights, V);
  
  res.json({ 
    embeddings,
    Q,
    K,
    V,
    attentionWeights,
    output
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});