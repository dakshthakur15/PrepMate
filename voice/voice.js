// PrepMate - Voice Interaction Module

// Speak the AI-generated question
function speakQuestion(question) {
    const speech = new SpeechSynthesisUtterance(question);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

// Listen to student's answer
function listenToAnswer() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        return "Speech recognition is not supported in this browser.";
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.start();

    recognition.onresult = function (event) {
        const answer = event.results[0][0].transcript;

        console.log("Student Answer:", answer);

        return answer;
    };

    recognition.onerror = function (event) {
        console.log("Voice Error:", event.error);
    };
}

// Example
speakQuestion("What is the difference between a while loop and a do-while loop?");
