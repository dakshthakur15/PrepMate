// PrepMate - Voice Interaction Module

const BACKEND_URL = "https://prepmate-r7bk.onrender.com";

// Speak the AI-generated question
function speakQuestion(question) {
    const speech = new SpeechSynthesisUtterance(question);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

// Listen to student's answer
function listenToAnswer(question) {
    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition is not supported. Please try Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = function () {
        console.log("Listening to your answer...");
    };

    recognition.onresult = async function (event) {
        const answer = event.results[0][0].transcript;

        console.log("Student Answer:", answer);

        try {
            const response = await fetch(
                `${BACKEND_URL}/analyze-answer`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        question: question,
                        answer: answer
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Backend request failed");
            }

            const result = await response.json();

            console.log("Analysis Result:", result);

            alert(
                "Your Answer: " + answer +
                "\n\nScore: " + result.score +
                "\nCorrectness: " + result.correctness +
                "\nRelevance: " + result.relevance +
                "\nClarity: " + result.clarity +
                "\n\nSuggestions: " +
                (result.suggestions || []).join(", ")
            );

        } catch (error) {
            console.error("Analysis Error:", error);
            alert("Could not analyze your answer. Please try again.");
        }
    };

    recognition.onerror = function (event) {
        console.error("Voice Error:", event.error);
        alert("Voice recognition error: " + event.error);
    };

    recognition.start();
}

// Example question
const question =
    "What is the difference between a while loop and a do-while loop?";

speakQuestion(question);
