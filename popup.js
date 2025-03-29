document.getElementById("checkGrammar").addEventListener("click", () => {
    let text = document.getElementById("inputText").value;
    chrome.runtime.sendMessage({ action: "checkGrammar", text: text }, response => {
        if (response.suggestion) {
            document.getElementById("suggestion").textContent = response.suggestion;
        } else {
            document.getElementById("suggestion").textContent = "Error checking grammar.";
        }
    });
});
