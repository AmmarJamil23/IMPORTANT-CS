//dot product that is element wise multiplication
export function dotProduct(vec1, vec2) {
    let sum = 0;
    for (let i = 0; i < vec1.length; i++) {
        sum += vec1[i] * vec2[i];
    }

    return sum;
}


//matrix multiplication for attention scores
export function computeAttentionScores(embeddings) {
    const seqLen = embeddings.length;
    const scores = [];

    for (let i = 0; i < seqLen; i++) {
        const row = [];
        for (let j = 0; j < seqLen; j++) {
            //computing similarity between token i and token j
            const score = dotProduct(embeddings[i], embeddings[j]);
            row.push(score);
        }
        scores.push(row);
    }
    return scores;
}


//applying softmax
// => softmax converts scores into probabilities (sums to 1.0)

export function softmax(scores) {
    const result = [];

    for (let i = 0; i < scores.length; i++) {
        const row = scores[i];

        //finding max for numerical stability
        const maxScore = Math.max(...row);

        //computing exp(score - max)
        const expScores = row.map(score => Math.exp(score - maxScore));

        //sum of exponentials
        const sumExp = expScores.reduce((a, b) => a + b, 0);

        //normalized
        const normalized = expScores.map(exp => exp / sumExp);
        result.push(normalized);
    }

    return result;
}