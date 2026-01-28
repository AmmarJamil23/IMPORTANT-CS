const embeddingDim = 8

//store embeddings for each unique words
const embeddingCache = {};

export function getEmbedding(word) {
    if (embeddingCache[word]) {
        return embeddingCache[word];
    }

//creating new random embedding for this word
const embedding = [];
for (let i = 0; i < embeddingDim; i++) {
    embedding.push(Math.random() * 0.1 - 0.05);
}

embeddingCache[word] = embedding;
return embedding
}

export function getEmbedding(tokens) {
    return tokens.map(token => getEmbedding(token.toLowerCase()));
}