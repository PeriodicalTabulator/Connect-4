

var player1 = "P1";
var player2 = "P2";
var currPlayer = player1;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

document.addEventListener('DOMContentLoaded', (event) => {
    // Your code to attach the event listener goes here
    document.getElementById('stop').addEventListener('click', function () {
        gameOver = false;
        // Disable the button
        this.disabled = true;
        // Call the function
        setGame();
    });
});



//create playing field
function setGame() {
    button=document.getElementById('restart')
    button.disabled=true
    console.log("function is running")
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            // JS
            row.push(' ');
            // HTML
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }
    
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

   
    r = currColumns[c];

    if (r < 0) {
        return;
    }
 //adding circles
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == player1) {
        tile.classList.add("red-piece");
        currPlayer = player2;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = player1;
    }

    r -= 1;
    currColumns[c] = r;
    checkWinner();
}

function checkWinner() {
    // horizontal (sliding window algorithm)
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // vertical (sliding window algorithm)
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // anti diagonal (sliding window algorithm)
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // diagonal (sliding window algorithm)
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}
let redpoint = document.getElementById('red'); 
//winner
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == player1) {
        winner.innerText = "Player1 Wins";
    } else {
        winner.innerText = "Player2 Wins";
    }
    gameOver = true;
    button=document.getElementById('restart')
    button.disabled=false;
    over();
}
//reset
function resetWeb() {
    window.location.reload();
  }