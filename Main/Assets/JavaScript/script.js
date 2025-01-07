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
var words = ["Joshua", "Ronald", "Wilson", "Nitin", "Adam", "Blair", "Casey", "Julian", "Frank" ]

// The Init function is called when the page loads
function init() {
    getwins();
    getLosses();
}


// start game function 




// winGame function




// loseGame function



// setTimer function and triggers winGame and loseGame


//  creates blanks 