import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Test route
app.get("/api/health", (req, res) => {
    res.json({
        status: "Server is running"
    });
});

//route of calculating attention
app.post('/api/calculate-attention', (req, res) => {
    const { tokens } = req.body;

    if (!tokens || !Array.isArray(tokens)) {
        return res.status(400).json({ error: 'Invalid tokens' });
    }

    const seqLen = tokens.length;

    const matrix = [];
    for (let i = 0; i< seqLen; i++) {
        const row = [];
        let sum = 0;

        for (let j = 0; j< seqLen; j++) {
            const value = Math.random();
            row.push(value);
            sum += value;
        }

        const normalized = row.map(val => val / sum);
        matrix.push(normalized);
    }
    res.json({ attentionMatrix: matrix });
});

//start server
app.listen(PORT, () => {
    console.log(`Server runnig on port ${PORT}`)
})