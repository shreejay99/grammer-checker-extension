document.addEventListener("input", function (event) {
    if (event.target.tagName === "TEXTAREA" || event.target.tagName === "INPUT") {
        let textField = event.target;
        let text = textField.value;

        chrome.runtime.sendMessage({ action: "checkGrammar", text: text }, response => {
            if (response.suggestion) {
                let correctedText = response.suggestion.corrected_text; // Extract corrected text from API response
                if (correctedText && correctedText !== text) {
                    highlightMistakes(textField, text, correctedText);
                }
            }
        });
    }
});

function highlightMistakes(textField, originalText, correctedText) {
    let originalWords = originalText.split(" ");
    let correctedWords = correctedText.split(" ");
    let highlightedText = "";

    for (let i = 0; i < originalWords.length; i++) {
        if (originalWords[i] !== correctedWords[i]) {
            highlightedText += `<span style="background-color: yellow; cursor: pointer;" onclick="replaceText('${textField.id}', '${correctedWords[i]}')">${originalWords[i]}</span> `;
        } else {
            highlightedText += originalWords[i] + " ";
        }
    }

    let tooltip = document.createElement("div");
    tooltip.innerHTML = highlightedText.trim();
    tooltip.style.position = "absolute";
    tooltip.style.background = "#fff";
    tooltip.style.border = "1px solid black";
    tooltip.style.padding = "5px";
    tooltip.style.zIndex = "1000";

    textField.parentNode.insertBefore(tooltip, textField.nextSibling);

    textField.addEventListener("blur", () => tooltip.remove());
}

function replaceText(inputId, newText) {
    document.getElementById(inputId).value = newText;
}
