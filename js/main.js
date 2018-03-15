// Tic Tac Toe - Championship Edition
// By Ivor King 2018
// Licence WTFPL
// All images owned by the author or licensed for reuse with modification.

// key variables
// create an array to store board state, with positions as follows (position 0 is not used)
// 1 2 3
// 4 5 6
// 7 8 9

// board setup as array values
// 0 - nothing played
// 1 - played 0
// 2 - played X

var bArray = 
[0,
    0,0,0,
    0,0,0,
    0,0,0
];

// variable to capture whose turn it is
// 0 = player 0
// 1 = player X

var turnVar = 0;

// declaring other global game variables

var gameOver = false;
var AIgame = false;
var noughtsScore = document.getElementById("noughts");
var crossesScore = document.getElementById("crosses");
var noughts = 0;
var crosses = 0;
var playerMessage = document.getElementsByClassName("textToPlayer");
playerMessage[0].innerHTML = "Noughts goes first...";

function setListener() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i).addEventListener('click',function() {
            clickChecker(i);
        });
    }
}

function clickChecker(i2) {
    if (!gameOver) {
        if (!AIgame) {
            if ((bArray[i2] === 0) && (turnVar === 0)) {
                document.getElementById(i2.toString()).setAttribute("src","images/nought.png");
                bArray[i2] = 1;
            }
            else if ((bArray[i2] === 0) && (turnVar === 1)) {
                document.getElementById(i2.toString()).setAttribute("src","images/cross.png");
                bArray[i2] = 2;
            }
            if (checkForWin(turnVar + 1)) {haveWinner()};
            if (!gameOver) {checkStaleMate()};
            if (!gameOver) {displayNextTurn()};            
        }
        else if (AIgame) {
            if ((bArray[i2] === 0) && (turnVar === 0)) {
                document.getElementById(i2.toString()).setAttribute("src","images/nought.png");
                bArray[i2] = 1;
                if (checkForWin(turnVar + 1)) {haveWinner()}
                if (!gameOver) {checkStaleMate()}
                if (!gameOver) {displayNextTurn()}
                if (!gameOver) {AImove()}
                if (!gameOver) {
                    if (checkForWin(turnVar + 1)) {
                        haveWinner();
                    }
                }
                if (!gameOver) {checkStaleMate()}
                if (!gameOver) {displayNextTurn()}
            }         
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

function checkForWin(valx) {
    if ((bArray[1] === valx && bArray[2] === valx && bArray[3] === valx) ||
        (bArray[4] === valx && bArray[5] === valx && bArray[6] === valx) ||
        (bArray[7] === valx && bArray[8] === valx && bArray[9] === valx) ||
        (bArray[1] === valx && bArray[4] === valx && bArray[7] === valx) ||
        (bArray[2] === valx && bArray[5] === valx && bArray[8] === valx) ||
        (bArray[3] === valx && bArray[6] === valx && bArray[9] === valx) ||
        (bArray[1] === valx && bArray[5] === valx && bArray[9] === valx) ||
        (bArray[3] === valx && bArray[5] === valx && bArray[7] === valx))
        { 
            return true;
        }
        else {
            return false;
        }
}

function haveWinner() {
    if (turnVar === 0) {
        playerMessage[0].innerHTML = 'Noughts wins!';
        noughts++;
        noughtsScore.innerHTML = `Noughts' score: ${noughts}`;
    }
    else {
        playerMessage[0].innerHTML = 'Crosses wins!';
        crosses++;
        crossesScore.innerHTML = `Crosses' score: ${crosses}`;
    }
    gameOver = true;
    console.log("have winner has run")
    reStarter();
}

function checkStaleMate() {
    for (let i3 = 1; i3 <= 9; i3++) {
        if (bArray[i3] === 0) { 
            return;
        }
    }
    playerMessage[0].innerHTML = "Nobody won. Super lame.";
    gameOver = true;
    reStarter();
}

function reStarter() {
    $.confirm({
        icon: 'fa fa-gamepad',
        title: 'Game over!',
        content: 'Would you like to play this remarkable game again?',
        boxWidth: '350px',
        buttons: {
            yes: {
                text: 'Of course I do',
                btnClass: 'btn-green',
                action: clearGame,
            },
            no: {
                text: 'Nope',
                btnClass: 'btn-red',
                action: badDecisions
            },
        }
    });
}

function clearGame() {
    // rebuild the board
    for (let i = 1; i <= 9; i++) {
        document.getElementById(i).setAttribute("src", "images/basesquare.png");
    }

    // reset vars
    gameOver = false;
    playerMessage[0].innerHTML = "Noughts goes first...";
    bArray = [0,0,0,0,0,0,0,0,0,0];
    turnVar = 0;
}

function badDecisions() {
    $.confirm({
        icon: 'fa fa-meh-o',
        content: 'I make bad decisions in life...',
        boxWidth: '250px',
        buttons: {
            yes: {
                text: 'Yes I do.',
                btnClass: 'btn-purple',
                action: goAwayNow,
            },
        }
    });
}

function goAwayNow() {
    window.location.replace("https://www.sadanduseless.com/2018/03/sad/");
}

function setupAI() {
    AIgame = true;
    setListener();
}

function AImove() {
    let posCounter = 1;
    let bArrayBlanksCounter = 0;

    for (let i4 = 1; i4 <= bArray.length; i4++) {
        if (bArray[i4] === 0) {bArrayBlanksCounter++}
    }

    // check for winning move
    for (let i5 = 1; i5 < bArray.length; i5++) {
        if (bArray[i5] === 0) {
            bArray[i5] = 2;
            if (checkForWin(turnVar + 1)) {
                document.getElementById(i5.toString()).setAttribute("src","images/cross.png");
                return;
            }
            else {
                bArray[i5] = 0;
            }
        }
    }

    // check defensive move required
    for (let i6 = 1; i6 < bArray.length; i6++) {
        if (bArray[i6] === 0) {
            bArray[i6] = 1;
            if (checkForWin(turnVar)) {
                document.getElementById(i6.toString()).setAttribute("src","images/cross.png");
                bArray[i6] = 2;
                return;
            }
            else {
                bArray[i6] = 0;
            }
        }
    }   

    // check centre free, if free then play there
    if (bArray[5] === 0) {
        document.getElementById("5").setAttribute("src","images/cross.png");
        bArray[5] = 2;
        return;
    }

    // default to play random move    
    let compMove = Math.floor(getRandom(0,bArrayBlanksCounter)) + 1;
    for (let i7 = 1; i7 <= bArray.length; i7++) {
        if ((bArray[i7] === 0) && (posCounter !== compMove)) {
            posCounter++;
        }
        else if ((bArray[i7] === 0) && (posCounter === compMove)) {
            document.getElementById(i7.toString()).setAttribute("src","images/cross.png");
            bArray[i7] = 2;
            return;
        }
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function openPrompt() {
    $.confirm({
        icon: 'fa fa-gamepad',
        title: 'Welcome!',
        content: 'What kind of setup would you like?',
        boxWidth: '420px',
        buttons: {
            yes: {
                btnClass: 'btn-blue',
                text: 'Human vs Human',
                action: setListener,
            },
            no: {
                btnClass: 'btn-blue',
                text: 'Human vs Computer',
                action: setupAI
            },
        }
    });
}

openPrompt();