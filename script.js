document.addEventListener('DOMContentLoaded', ()=> {
    //getting DOM elements
const wordDisplay = document.getElementById("wordDisplay");
const inputEl = document.getElementById("input-el");
const timer = document.getElementById("timer");
const wordCount = document.getElementById("words");
const charCount = document.getElementById("chars");
const accuracyEl = document.getElementById("accuracy");
const popupEL = document.getElementById("pop-up");
const customNotification = document.querySelector(".custom-notice-container");
const customBtn = document.getElementById("custom-btn");
const customHeader = document.querySelector('.custom-header');
const customContent = document.querySelector('.custom-p');
const mainContainer = document.querySelector('.container');

//Initializing variables
let correctWords = 0;
let totalTypedWords = 0;
let totalTypedChars = 0;
let countDown = 60;
let timerStarted = false;
let intervalId;


//array containing words
let words = [
  "apple", "banana", "cherry", "dog", "elephant", "fish", "grape", "jungle",
  "kite", "lemon", "monkey", "nest", "orange", "penguin", "queen", "rain", "tree",
  "umbrella", "violin", "whale", "xylophone", "yogurt", "zebra", "box", "cloud", "drum",
  "eagle", "fox", "garden", "hill", "island", "jam", "kangaroo", "lamp", "moon", "notebook",
  "ocean", "piano", "quilt", "robot", "star", "tiger", "uniform", "van", "window", "xray",
  "yarn", "zoo", "arch", "ball", "circle", "desk", "engine", "gold", "horse",
  "jacket", "key", "leaf", "mouse", "needle", "paper", "quiz", "rocket",
  "stone", "table", "vase", "wheel", "xenon", "yolk", "zinc", "anchor", "bread", "coin",
  "doll", "energy", "flame", "glass", "hammer", "idea", "jet", "kettle", "ladder", "magnet",
  "oil", "plant", "quest", "ring", "socks", "tent", "unity", "voice", "water",
  "xmas", "year", "zone", "alley", "bridge", "candle", "drawer", "echo", "feather", "gift",
  "helmet", "iron", "knife", "lock", "mirror", "oak", "pencil", "question", "rope", "sand",
  "tool", "under", "velvet", "wave", "xerox", "yield", "zipper", "art", "bowl", "cliff",
  "dance", "egg", "fire", "game", "iceberg", "joy", "king", "line", "market", "nose",
  "orb", "quote", "rose", "shell", "tail", "unicorn", "vulture", "wish", "yeti", "zen",
  "antique", "boat", "crayon", "drizzle", "entry", "fog", "glue", "hawk", "image", "jewel",
  "lime", "night", "puddle", "radio", "scene", "track", "value", "whisper", "yummy",
  "bottle", "climb", "frost", "green", "hover", "index", "kitten", "lunch", "movie", "number",
  "open", "quiet", "road", "smile", "touch", "usual",
  "bat", "cap", "den", "ear", "gem", "jar", "kit", "log", "man", "pot", "toy", "zip", "run", "pen",
  "album", "beach", "cabin", "driver", "freeze", "grill", "honest", "ignite", "jigsaw", "kitchen",
  "ladle", "marker", "object", "pickup", "quiver", "remote", "studio", "ticket", "upload", "vendor",
  "wallet", "zeal", "avatar", "bouncer", "clicker", "dancer", "editor", "flick", "gadget", "journal",
  "kneel", "locker", "muted", "noted", "oxygen", "packet", "quoted", "rescue", "sender", "toggle",
  "umpire", "verify", "wonder", "yard", "zigzag", "amount", "borrow", "custom", "dollar", "export",
  "format", "growth", "height", "import", "jumper", "karate", "legend", "motion", "narrow", "option",
  "portal", "quartz", "region", "submit", "timing", "urgent", "vacuum", "winner", "fun", "mud", "top",
  "sip", "hug", "nap", "big", "bug", "low", "new", "old", "red", "hot", "net", "ink", "owl"
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
        wordDisplay.appendChild(span);
    });
}

renderWords();



//Timer function
function startTimer(){
    intervalId = setInterval(() => {
        countDown--;
        timer.textContent = countDown;

        if(countDown <= 0){
            clearInterval(intervalId);
            inputEl.disabled = true;
            customNotification.classList.add("view");
            mainContainer.classList.add("grayscale");
        }
    }, 1000);
}



//Input element listener
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

        //adding custom 
        if(correctWords < 30){
            customHeader.textContent = "You're a Turtle";
            customContent.textContent = `Well... You type with the speed of ${correctWords} WPM (${totalTypedChars} CPM). Your accuracy was ${accuracy}%. Slow and steady might win the race, but it's time to pick up the pace!`
        } else if(correctWords <= 40){
            customHeader.textContent = "You're a T-Rex";
            customContent.textContent = `Powerful but a bit clumsy! You typed at ${correctWords} WPM (${totalTypedChars} CPM), with ${accuracy}% accuracy. You've got the strength—now sharpen those tiny typing arms!`;
        } else if(correctWords <= 55){
            customHeader.textContent = "You're an Octopus";
            customContent.textContent = `Nice work! You reached ${correctWords} WPM (${totalTypedChars} CPM) with ${accuracy}% accuracy. Like an octopus with 8 limbs, you're juggling keys with skill. Keep training those tentacles!`;
        } else{
            customHeader.textContent = "You're a Falcon";
            customContent.textContent = `Incredible! Your speed is ${correctWords} WPM (${totalTypedChars} CPM), and your accuracy is ${accuracy}%. Fast, sharp, and focused—you're flying through the keyboard skies!`
        };

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




//custom button listener
customBtn.addEventListener('click', () => {
    // Clear any existing interval if timer is still running
    clearInterval(intervalId);

    // Reset tracking variables
    correctWords = 0;
    totalTypedChars = 0;
    totalTypedWords = 0;
    countDown = 60;
    timerStarted = false;
    currentWordIndex = 0;

    // Reset UI
    inputEl.disabled = false;
    inputEl.value = "";
    wordCount.textContent = "0";
    charCount.textContent = "0";
    accuracyEl.textContent = "0";
    timer.textContent = countDown;

    // Rerender and scroll to start
    renderWords();
    wordDisplay.scrollTo({ left: 0, behavior: "auto" });

    // Hide the custom notification
    customNotification.classList.remove("view");
    mainContainer.classList.remove("grayscale");
});


})
