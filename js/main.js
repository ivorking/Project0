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

// Create an array to store board state, with positions as follows
// 1 2 3
// 4 5 6
// 7 8 9

let bArray = [
    0,0,0,     
    0,0,0,     
    0,0,0      
];

// Variable to capture whose turn it is
// 0 = player 0
// 1 = player X

let turnVar = 0;
let turnTaken = 0;
var alertString = "";

function setListener() {
    for (let i = 1; i < 10; i++) {
        document.getElementById(i).addEventListener('click',function() {clickChecker(i)});
    }
}

function clickChecker(i2) {
    if (bArray[i2] === 0 && turnVar === 0) {
        document.getElementById(i2.toString()).setAttribute("src","images/nought.png");
        bArray[i2] = 1;
        checkForWin();
    }
    else if (bArray[i2] === 0 && turnVar === 1) {
        document.getElementById(i2.toString()).setAttribute("src","images/cross.png");
        bArray[i2] = 2;
        checkForWin();
    }

}

// Checks array for a win condition

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
            gameOver();
        }
    if (turnVar === 0) {turnVar = 1}
    else {turnVar = 0}
}

// window.onload = function sendResult() {
//     if (alertString != "") {
//         alert(alertString);
//     }
// }

function gameOver() {
    if (turnVar === 0) {
        alertString = 'Noughts wins!';
    }
    else {
        alertString = 'Crosses wins!';
    }
    for (let i3 = 1; i3 < 10; i3++) {
        document.getElementById(i3).removeEventListener('click',function() {clickChecker(i3)});
    }
    console.log(alertString);
}

setListener();


// CODE DUMP - not in use

// document.getElementsByName("img")

// function clickRunner(event) {
//     xPos = event.clientX;
//     yPos = event.clientY;
//     console.log(xPos,yPos);
//     // if (xPos > 15 && xPos < 258) {
//     //       }  if (yPos > 93 && yPos )

//     //  =
//     //   "clientX: " + event.clientX +
//     //   " - clientY: " + event.clientY;
//   }
//   window.onload = function() {
      
// var element = document.getElementById("pos0");

// var var1 = document.getElementById("pos0");
// var1.addEventListener('click',clickRun(0));

// function clickRun(clickPos) {
//     alert("hello");
// }
// function boardPrinter() {
//     var boardString = "";
//     for (let i = 0; i < tBoardArray.length; i++) {
//         boardString = boardString + tBoardArray[i] + " ";
//         if (i === 2 || i === 5) {
//             boardString = boardString + "<br>";
//         }
//     }
//     return boardString;
// }
// document.getElementById('gameBoard').innerHTML = boardPrinter();

// window.prompt()

// createBoard.innerHTML = tBoardArray;
// document.body.appendChild(createBoard); 

// var boardArray = document.getElementById["gameBoard"];
// boardArray.innerHTML = "muggins";
// document.getElementById("gameBoard").innerHTML = "Paragraph changed!";
// boardArray = "muggins";

// var imgArray = document.querySelectorAll('a');
// for (let index = 0; index < imgArray.length; index++) {
//     var currentHREF = imgArray[index].getAttribute('href');
//     var newElement = document.createElement('a');
//     var newElement2 = document.createElement('img');
//     newElement.appendChild(newElement2);
//     newElement.href = currentHREF;
//     newElement2.src = picThumb;
//     var linky = document.getElementsByTagName('li')[index];
//     linky.parentNode.insertBefore(newElement, linky.nextSibling);
// }

