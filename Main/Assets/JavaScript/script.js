var wordBlank = document.querySelector(".word-blanks");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button")

var chosenWord = "";
var numBlanks = 0;
var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// Arrays used to create blanks and letters of screen
var letterInChosenWord = [];
var blankLetters = [];

// Array of words the user will guess
var words = ["Joshua", "Ronald", "Wilson", "Nitin", "Adam", "Blair", "Casey", "Julian", "Frank", "Eric", "Byron", "Herb", "Jose"]

// The Init function is called when the page loads
function init() {
    getWins();
    getLosses();
}


// start game function 
function startGame() {
    isWin = false;
    timerCount = 30;
    // Prevents start buttom from being used during rounds
    startButton.disabled = true;
    renderBlanks()
    startTimer()
}

// winGame function
function winGame() {
    wordBlank.textContent = "WINNER";
    winCounter++
    startButton.disabled = false;
    setWins()
}

// loseGame function
function loseGame() {
    wordBlank.textContent = "Game Over";
    loseCounter++
    startButton.disabled = false;
    setLosses()
}

// setTimer function and triggers winGame and loseGame
function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if(timerCount >= 0) {
             if(isWin && timerCount > 0) {
                clearInterval(timer);
                winGame();
             }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            loseGame();
        }
    }, 1000);
}
//  creates blanks 
function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    letterInChosenWord = chosenWord.split("");
    numBlanks = letterInChosenWord.length;
    blankLetters = []

    for (var i = 0; i < numBlanks; i++) {
        blankLetters.push("_");
    }
    wordBlank.textContent = blankLetters.join(" ")
}

// update win count, set win count
function setWins() {
    win.textContent = winCounter;
    localStorage.setItem("WinCount", winCounter);
}

// update lose count, set lose count
function setLosses() {
    lose.textContent = loseCounter;
    localStorage.setItem("losecount", loseCounter);
}

// function used by init
function getWins() {
    var storedWins = localStorage.getItem("winCount");
//  if value doesnt exist counter will be 0
if (storedWins === null) {
    winCounter = 0;
}   else {
    // if value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
}
//  Render win count to page
win.textContent = winCounter;
}

function getLosses() {
    var storedLosses = localStorage.getItem("loseCount");
    if (storedLosses === null) {
        loseCounter = 0;
    } else {
        loseCounter = parseInt(storedLosses); // Convert to number
    }
    lose.textContent = loseCounter;
}

function checkWin() {
    if (chosenWord === blankLetters.join("")) {
        isWin = true;
    }
}

function checkLetters(letter) {
    let letterInWord = false;
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i].toLowerCase() === letter) {
            letterInWord = true;
        }
    }
    if (letterInWord) {
        for (var j = 0; j < numBlanks; j++) {
            if (chosenWord[j].toLowerCase() === letter) {
                blankLetters[j] = chosenWord[j]; // Preserve case in blanks
            }
        }
        wordBlank.textContent = blankLetters.join(" ");
    }
}

// event listener to document key event
document.addEventListener("keydown", function(event) {
    if (timerCount === 0) {
        return;
    }
// convert all keys to lower case
var key = event.key.toLowerCase();
var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwuxyz0123456789 " .split("")
// test if key pushed is letter
if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
}
});

// Event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// call init, make sure pages fires when opened
init();

//  reset button 
var resetButton = document.querySelector(".reset-button");

function resetGame() {
    // Reset win and loss counters
    winCounter = 0;
    loseCounter = 0;

    // Update counters in UI and localStorage
    setWins();
    setLosses();

    // Reset game-related UI elements
    wordBlank.textContent = "";
    timerElement.textContent = "30"; // Reset timer display
    clearInterval(timer); // Stop the timer if running

    // Re-enable the start button
    startButton.disabled = false;

    console.log("Game has been reset!");
}
//  attaches event listener to button 
resetButton.addEventListener("click", resetGame);
