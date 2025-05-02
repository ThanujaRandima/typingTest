const wordDisplay = document.getElementById("wordDisplay");
const inputEl = document.getElementById("input-el");

let words = [
    "Standard", "generator", "kite", "small", "peak", "waterfall", "trust", "black", "skill",
    "focus", "speed", "bright", "vision", "glow", "machine", "dynamic", "strong", "code",
    "matrix", "shift", "target", "flash", "grip", "signal", "index", "pulse", "quiet", "logic",
    "spark", "swift", "range", "track", "limit", "light", "curve", "stack", "flow", "shape", "mark"
];

let currentWordIndex = 0;

function renderWords() {
    wordDisplay.innerHTML = ""; // Clear display
    words.forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.id = `word-${index}`;
        span.style.marginRight = "20px"; // Add spacing between words
        wordDisplay.appendChild(span);
    });
}

renderWords();

inputEl.addEventListener("keydown", function (event) {
    if (event.key === " ") {
        event.preventDefault();
        const typedWord = inputEl.value.trim();
        const currentSpan = document.getElementById(`word-${currentWordIndex}`);
        const currentWord = words[currentWordIndex];

        if (typedWord === currentWord) {
            currentSpan.style.color = "green";
        } else {
            currentSpan.style.color = "red";
        }

        currentWordIndex++;
        inputEl.value = "";

        // Always scroll even if out of words
        if (currentWordIndex < words.length) {
            const nextSpan = document.getElementById(`word-${currentWordIndex}`);
            const scrollOffset = nextSpan.offsetLeft - wordDisplay.offsetLeft;
            wordDisplay.scrollTo({ left: scrollOffset, behavior: "smooth" });
        } else {
            wordDisplay.scrollTo({ left: wordDisplay.scrollWidth, behavior: "smooth" });
        }
    }
});
