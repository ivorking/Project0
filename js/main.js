// TASK

// Big Goals
// Build a web application from scratch, without a starter codebase
// Use your programming skills to map out the game logic for a simple game like Tic Tac Toe
// Separate HTML, CSS, and JavaScript files in your application
// Build an application to a spec that someone else gives you
// Build a dynamic game that allows two players to compete
// Craft a readme.md file that explains your app to the world
// Technical Requirements
// Your app must:

// Render a game board in the browser
// Switch turns between X and O (or whichever markers you select)
// Visually display which side won if a player gets three in a row or show a draw/"cat’s game" if neither wins
// Include separate HTML / CSS / JavaScript files
// Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
// Use Javascript for DOM manipulation
// Deploy your game online, where the rest of the world can access it
// Use semantic markup for HTML and CSS (adhere to best practices)

// VARIABLES

// Board setup involves
// 0 - nothing played
// 1 - played 0
// 2 - played X

// Create an array to store board state, with positions as follows (position 0 is not used)
// 1 2 3
// 4 5 6
// 7 8 9

var bArray = 
[0,
    0,0,0,
    0,0,0,
    0,0,0
];

// Variable to capture whose turn it is
// 0 = player 0
// 1 = player X

var turnVar = 0;

// Declaring other variables

var gameOver = false;
var scores = document.getElementsByClassName("scoreTrack");
var noughtScore = 0;
var crossScore = 0;
var playerMessage = document.getElementsByClassName("textToPlayer");
playerMessage[0].innerHTML = "Noughts goes first...";

function setListener() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i).addEventListener('click',function() {clickChecker(i)});
    }
}

function clickChecker(i2) {
    if (!gameOver) {
        if (bArray[i2] === 0 && turnVar === 0) {
            document.getElementById(i2.toString()).setAttribute("src","images/nought.png");
            bArray[i2] = 1;
        }
        else if (bArray[i2] === 0 && turnVar === 1) {
            document.getElementById(i2.toString()).setAttribute("src","images/cross.png");
            bArray[i2] = 2;
        }
        checkForWin();
        checkStaleMate();
        if (!gameOver) {
            displayNextTurn();
        }
    }
}

function displayNextTurn() {
    if (turnVar === 1) {
        playerMessage[0].innerHTML = "Noughts' turn";
        turnVar = 0;
    }
    else {
        playerMessage[0].innerHTML = "Crosses' turn";
        turnVar = 1;
    }
}

function checkForWin() {
    let tVar = turnVar + 1;
    if ((bArray[1] === tVar && bArray[2] === tVar && bArray[3] === tVar) ||
        (bArray[4] === tVar && bArray[5] === tVar && bArray[6] === tVar) ||
        (bArray[7] === tVar && bArray[8] === tVar && bArray[9] === tVar) ||
        (bArray[1] === tVar && bArray[4] === tVar && bArray[7] === tVar) ||
        (bArray[2] === tVar && bArray[5] === tVar && bArray[8] === tVar) ||
        (bArray[3] === tVar && bArray[6] === tVar && bArray[9] === tVar) ||
        (bArray[1] === tVar && bArray[5] === tVar && bArray[9] === tVar) ||
        (bArray[3] === tVar && bArray[5] === tVar && bArray[7] === tVar))
        {
            haveWinner();
        }
}

function haveWinner() {
    if (turnVar === 0) {
        playerMessage[0].innerHTML = 'Noughts wins!';
    }
    else {
        playerMessage[0].innerHTML = 'Crosses wins!';
    }
    gameOver = true;
    reStarter();
}

function checkStaleMate() {
    for (let i3 = 1; i3 <= 9; i3++) {
        if (bArray[i3] === 0) { 
            return;
        }
    }
    playerMessage[0].innerHTML = "Nobody won. Super lame. Try harder next time people.";
    gameOver = true;
    reStarter();
}

function reStarter() {
    $.confirm({
        title: 'Game over!',
        content: 'Would you like to play this remarkable game again?',
        boxWidth: '350px',
        buttons: {
            yes: {
                text: 'Of course I do',
                action: clearGame,
            },
            no: {
                text: 'Nope',
                action: goAwayNow
            },
        }
    });
}

function clearGame() {
    // rebuild the board
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i).setAttribute("src", "images/basesquare.png");
    }

    gameOver = false;
    playerMessage[0].innerHTML = "Noughts goes first...";

    // reset all vars
    bArray = [0,0,0,0,0,0,0,0,0,0];
    turnVar = 0;
    tVar = 0;
}

function goAwayNow() {
    window.location.replace("https://www.sadanduseless.com/2018/03/sad/");
}

setListener();
