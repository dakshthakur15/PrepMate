// PrepMate Backend

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
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

    console.log("Preparation Type:", type);
    console.log("Difficulty Level:", level);
    console.log("Topic:", topic);

    // Temporary response
    // Real AI integration will be added later
    const question =
        `Generate a ${level} level ${type} question on ${topic}.`;

    res.json({
        question: question
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`PrepMate Backend running on port ${PORT}`);
});
