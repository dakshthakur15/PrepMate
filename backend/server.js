// PrepMate Backend

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "PrepMate Backend is running!"
    });
});

// Generate Question API
app.post("/generate-question", (req, res) => {
    const { type, level, topic } = req.body;

    if (!type || !level || !topic) {
        return res.status(400).json({
            error: "Type, level and topic are required."
        });
    }

    const question =
        `Generate a ${level} level ${type} question on ${topic}.`;

    res.json({ question });
});

// Answer Analysis API
app.post("/analyze-answer", (req, res) => {
    const { question, answer } = req.body;

    if (!question || !answer) {
        return res.status(400).json({
            error: "Question and answer are required."
        });
    }

    const result = analyzeAnswer(question, answer);

    res.json(result);
});

// Basic answer analysis
function analyzeAnswer(question, answer) {
    const text = answer.trim();

    if (!text) {
        return {
            score: 0,
            correctness: "Not answered",
            relevance: "Not evaluated",
            clarity: "Not evaluated",
            mistakes: ["No answer was provided."],
            suggestions: ["Try answering the question."]
        };
    }

    const result = {
        score: 0,
        correctness: "Needs AI evaluation",
        relevance: "Not evaluated",
        clarity: "Not evaluated",
        mistakes: [
            "Automated AI evaluation is not connected yet."
        ],
        suggestions: [
            "Connect an AI model to evaluate correctness and relevance."
        ]
    };

    // Temporary score based on answer length.
    // This is NOT a real correctness score.
    if (text.length >= 100) {
        result.score = 7;
        result.clarity = "Detailed answer";
    } else if (text.length >= 40) {
        result.score = 5;
        result.clarity = "Moderate detail";
    } else {
        result.score = 2;
        result.clarity = "Short answer";
    }

    return result;
}

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`PrepMate Backend running on port ${PORT}`);
});
