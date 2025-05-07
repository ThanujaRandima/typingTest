//getting DOM elements
const wordDisplay = document.getElementById("wordDisplay");
const inputEl = document.getElementById("input-el");
const timer = document.getElementById("timer");
const wordCount = document.getElementById("words");
const charCount = document.getElementById("chars");
const accuracyEl = document.getElementById("accuracy");
const popupEL = document.getElementById("pop-up");


let correctWords = 0;
let totalTypedWords = 0;
let totalTypedChars = 0;
let countDown = 60;
let timerStarted = false;
let intervalId;


//array containing words
let words = [
    "apple", "banana", "cherry", "dog", "elephant", "fish", "grape", "hat", "ice", "jungle",
    "kite", "lemon", "monkey", "nest", "orange", "penguin", "queen", "rain", "sun", "tree",
    "umbrella", "violin", "whale", "xylophone", "yogurt", "zebra", "ant", "box", "cloud", "drum",
    "eagle", "fox", "garden", "hill", "island", "jam", "kangaroo", "lamp", "moon", "notebook",
    "ocean", "piano", "quilt", "robot", "star", "tiger", "uniform", "van", "window", "xray",
    "yarn", "zoo", "arch", "ball", "circle", "desk", "engine", "fan", "gold", "horse",
    "ink", "jacket", "key", "leaf", "mouse", "needle", "owl", "paper", "quiz", "rocket",
    "stone", "table", "vase", "wheel", "xenon", "yolk", "zinc", "anchor", "bread", "coin",
    "doll", "energy", "flame", "glass", "hammer", "idea", "jet", "kettle", "ladder", "magnet",
    "net", "oil", "plant", "quest", "ring", "socks", "tent", "unity", "voice", "water",
    "xmas", "year", "zone", "alley", "bridge", "candle", "drawer", "echo", "feather", "gift",
    "helmet", "iron", "knife", "lock", "mirror", "oak", "pencil", "question", "rope", "sand",
    "tool", "under", "velvet", "wave", "xerox", "yield", "zipper", "art", "bowl", "cliff",
    "dance", "egg", "fire", "game", "iceberg", "joy", "king", "line", "market", "nose",
    "orb", "quote", "rose", "shell", "tail", "unicorn", "vulture", "wish", "yeti", "zen",
    "antique", "boat", "crayon", "drizzle", "entry", "fog", "glue", "hawk", "image", "jewel",
    "lime", "night", "puddle", "radio", "scene", "track", "value", "whisper", "yummy", "zebra",
    "bottle", "climb", "dance", "frost", "green", "hover", "index", "jungle", "kitten", "lunch",
    "movie", "number", "open", "plant", "quiet", "road", "smile", "touch", "usual", "voice"
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

//Displaying words
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



//timer function
function startTimer(){
    intervalId = setInterval(() => {
        countDown--;
        timer.textContent = countDown;

        if(countDown <= 0){
            clearInterval(intervalId);
            inputEl.disabled = true;
        }
    }, 1000);
}

inputEl.addEventListener("keydown", function (event) {
    if(!timerStarted){
        startTimer();
        timerStarted = true;
    }

    //fading out popup element
    popupEL.classList.add('fade-out');
    setTimeout(()=>{
        popupEL.style.display = 'none'
    }, 1500);

    if (event.key === " ") {//detects space key from being entered
        event.preventDefault(); //prevent space from being entered to the input field
        const typedWord = inputEl.value.trim(); //get the typed words without spaces
        const currentSpan = document.getElementById(`word-${currentWordIndex}`);
        const currentWord = words[currentWordIndex];

        if (typedWord === currentWord) {
            currentSpan.style.color = "green"; //mark correct words in green
            correctWords++;
            totalTypedChars+= typedWord.length;
        } else {
            currentSpan.style.color = "red"; //mark incorrect words in red
        }

        totalTypedWords++;
        wordCount.textContent = correctWords;
        charCount.textContent = totalTypedChars;
        currentWordIndex++;
        inputEl.value = "";

        //checking the accuracy
        let accuracy = Math.floor((correctWords/ totalTypedWords) * 100);
        accuracyEl.textContent = accuracy;

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



