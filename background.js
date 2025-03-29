const GEMINI_API_KEY = ""; 

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkGrammar") {
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: `Check grammar and suggest corrections. Original: "${request.text}"` })
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.text) {
                sendResponse({ suggestion: { corrected_text: data.text } });
            } else {
                sendResponse({ suggestion: null });
            }
        })
        .catch(error => sendResponse({ error: error.message }));

        return true;
    }
});
