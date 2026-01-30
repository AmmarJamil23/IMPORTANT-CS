//initialize weight matrices for Q, K, V projections these will be learned during training

export class QKVProjections {
    constructor(dModel) {
        this.dModel = dModel; //Embedding dimension

        //initialize wieght matricces with small random values
        this.W_q = this.initializeMatrix(dModel, dModel);
        this.W_k = this.initializeMatrix(dModel, dModel);
        this.W_v = this.initializeMatrix(dModel, dModel);
    }

    //Xavier initialization

    initializeMatrix(rows, cols) {
        const limit = Math.sqrt(6.0 / (rows + cols));
        const matrix = [];

        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                //random values between -limit and + limit
                row.push((Math.random() * 2 - 1) * limit);
            }
            matrix.push(row);
        }
        return matrix;
    }

    //matrix multiplication: vector * matrix
    matrixVectorMultiply(vector, matrix) {
        const result = [];

        for (let i = 0; i < matrix[0].length; i++) {
            let sum = 0;
            for (let j = 0; j < vector.length; j++) {
                sum += vector[j] * matrix[j][i];
            }
            result.push(sum);
        }
        return result;
    }

    //project embeddings to Q, K, V
    project(embeddings) {
        const Q = embeddings.map(emb => this.matrixVectorMultiply(emb, this.W_q));
        const K = embeddings.map(emb => this.matrixVectorMultiply(emb, this.W_k));
        const V = embeddings.map(emb => this.matrixVectorMultiply(emb, this.W_v));

        return { Q, K, V};
    }
}