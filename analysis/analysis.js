// PrepMate - Answer Analysis & Scoring Module

function analyzeAnswer(question, answer) {
    console.log("Question:", question);
    console.log("Student Answer:", answer);

    // Basic analysis structure
    const result = {
        score: 0,
        correctness: "Needs improvement",
        relevance: "Needs improvement",
        clarity: "Needs improvement",
        mistakes: [],
        suggestions: []
    };

    // Basic answer check
    if (!answer || answer.trim() === "") {
        result.score = 0;
        result.mistakes.push("No answer was provided.");
        result.suggestions.push("Try to answer the question clearly.");
        return result;
    }

    // Placeholder scoring
    if (answer.trim().length > 20) {
        result.score = 7;
        result.correctness = "Good";
        result.relevance = "Good";
        result.clarity = "Good";

        result.suggestions.push(
            "Try to include an example to make your answer stronger."
        );
    } else {
        result.score = 5;
        result.correctness = "Average";
        result.relevance = "Average";
        result.clarity = "Needs improvement";

        result.suggestions.push(
            "Give a more detailed and clear explanation."
        );
    }

    return result;
}

// Example
const result = analyzeAnswer(
    "What is a pointer in C?",
    "A pointer is a variable that stores the address of another variable."
);

console.log("Analysis Result:", result);
