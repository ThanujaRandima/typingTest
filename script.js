//getting DOM elements
const wordDisplay = document.getElementById("wordDisplay");
const inputEl = document.getElementById("input-el");
const timer = document.getElementById("timer");
const wordCount = document.getElementById("words");
const charCount = document.getElementById("chars");
const accuracyEl = document.getElementById("accuracy");
const popupEL = document.getElementById("pop-up");


//array containing words
let words = [
    "apple", "Banana", "cherry", "Dog", "elephant", "Fish", "grape", "Hat", "ice", "Jungle",
    "kite", "Lemon", "monkey", "Nest", "orange", "Penguin", "queen", "Rain", "sun", "Tree",
    "umbrella", "Violin", "whale", "Xylophone", "yogurt", "Zebra", "ant", "Box", "cloud", "Drum",
    "eagle", "Fox", "garden", "Hill", "island", "Jam", "kangaroo", "Lamp", "moon", "Notebook",
    "ocean", "Piano", "quilt", "Robot", "star", "Tiger", "uniform", "Van", "window", "Xray",
    "yarn", "Zoo", "arch", "Ball", "circle", "Desk", "engine", "Fan", "gold", "Horse", "ink",
    "Jacket", "key", "Leaf", "mouse", "Needle", "owl", "Paper", "quiz", "rocket", "Stone",
    "table", "Umbrella", "vase", "wheel", "xenon", "Yolk", "zinc", "anchor", "Bread", "coin", "Doll",
    "energy", "Flame", "glass", "Hammer", "idea", "Jet", "kettle", "Ladder", "magnet", "Net",
    "oil", "plant", "Quest", "ring", "socks", "Tent", "unity", "Voice", "water", "Xmas",
    "year", "zone", "alley", "Bridge", "candle", "Drawer", "Echo", "Feather", "gift", "Helmet",
    "iron", "Jungle", "knife", "Lock", "mirror", "Nest", "oak", "Pencil", "question", "rope",
    "Sand", "tool", "under", "Velvet", "wave", "xerox", "Yield", "zipper", "Art", "Bowl",
    "cliff", "Dance", "egg", "Fire", "game", "Hat", "iceberg", "Joy", "king", "Line",
    "market", "Nose", "orb", "plant", "Quote", "rose", "Shell", "tail", "Unicorn", "vulture",
    "wish", "Yeti", "zen", "Antique", "Boat", "crayon", "Drizzle", "entry", "Fog",
    "glue", "Hawk", "image", "Jewel", "kite", "Lime", "mirror", "night", "oak", "Puddle"
  ];


//function to shuffle the array
function shuffle(array){
    for(let i = array.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]] 
    }
    return array;
}

let currentWordIndex = 0;


function renderWords(){
    wordDisplay.innerHTML = ""; //clear display
    shuffle(words).forEach((word, index) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.id = `word-${index}`;
        span.style.marginRight = "20px"; //add soacing between words
        wordDisplay.appendChild(span)
    });
}

renderWords();

inputEl.addEventListener("keydown", function (event) {
    if (event.key === " ") {//detects space key from being entered
        event.preventDefault(); //prevent space from being entered to the input field
        const typedWord = inputEl.value.trim(); //get the typed words without spaces
        const currentSpan = document.getElementById(`word-${currentWordIndex}`);
        const currentWord = words[currentWordIndex];

        if (typedWord === currentWord) {
            currentSpan.style.color = "green"; //mark correct words in green
        } else {
            currentSpan.style.color = "red"; //mark incorrect words in red
        }

        currentWordIndex++;
        inputEl.value = "";

        // Always scroll even if out of words
        if (currentWordIndex < words.length) {
            const nextSpan = document.getElementById(`word-${currentWordIndex}`);
            const scrollOffset = nextSpan.offsetLeft - wordDisplay.offsetLeft;
            wordDisplay.scrollTo({ left: scrollOffset, behavior: "smooth" });
        } else {
            //if all the words are typed, scroll to the end
            wordDisplay.scrollTo({ left: wordDisplay.scrollWidth, behavior: "smooth" });
        }
    }
});