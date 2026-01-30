// Dot product: sum of element-wise multiplication
export function dotProduct(vec1, vec2) {
  let sum = 0;
  for (let i = 0; i < vec1.length; i++) {
    sum += vec1[i] * vec2[i];
  }
  return sum;
}

// Compute attention scores using Q and K (not raw embeddings anymore!)
export function computeAttentionScores(Q, K) {
  const seqLen = Q.length;
  const dModel = Q[0].length;
  const scaleFactor = Math.sqrt(dModel);
  
  const scores = [];
  
  for (let i = 0; i < seqLen; i++) {
    const row = [];
    for (let j = 0; j < seqLen; j++) {
      // Q × K^T (query looks for matching keys)
      const score = dotProduct(Q[i], K[j]) / scaleFactor;
      row.push(score);
    }
    scores.push(row);
  }
  
  return scores;
}

export function softmax(scores) {
  const result = [];
  
  for (let i = 0; i < scores.length; i++) {
    const row = scores[i];
    
    const maxScore = Math.max(...row);
    const expScores = row.map(score => Math.exp(score - maxScore));
    const sumExp = expScores.reduce((a, b) => a + b, 0);
    const normalized = expScores.map(exp => exp / sumExp);
    result.push(normalized);
  }
  
  return result;
}

// NEW: Apply attention weights to values
export function applyAttention(attentionWeights, V) {
  const seqLen = attentionWeights.length;
  const dModel = V[0].length;
  const output = [];
  
  for (let i = 0; i < seqLen; i++) {
    const outputVector = Array(dModel).fill(0);
    
    // Weighted sum of values
    for (let j = 0; j < seqLen; j++) {
      const weight = attentionWeights[i][j];
      for (let d = 0; d < dModel; d++) {
        outputVector[d] += weight * V[j][d];
      }
    }
    
    output.push(outputVector);
  }
  
  return output;
}
