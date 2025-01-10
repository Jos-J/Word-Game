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
    getwins();
    getLosses();
}


// start game function 
function startGame() {
    isWin = false;
    timerCount = 60;
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

// update lose count, set lose count