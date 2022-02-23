const allCell = document.querySelectorAll("#cell");
const winnerDeclaration = document.querySelector(".winner");
const restartBtn = document.querySelector(".restart");
const p1 = document.querySelector(".player1");
const p2 = document.querySelector(".player2");
let gameOver = false;
let marker = "X";


const player = (name, marker, turn) => {
    const getMarker = () => (marker);
    const getName = () => (name);
    let score = 0;
    this.turn = turn;
    return { getMarker, getName, turn };
}

const clickHandler = function (e) {

    // console.log(e.target.dataset.i);
    if (!gameOver) {
        if (marker === 'X') {
            TicTacToe.putMarker(player1, e.target.dataset.i);
            e.target.innerText = player1.getMarker();
            marker = "O";
        } else {
            TicTacToe.putMarker(player2, e.target.dataset.i);
            e.target.innerText = player2.getMarker();
            marker = "X";
        }
    }


}

const TicTacToe = function () {
    let board = ['', '', '', '', '', '', '', '', ''];
    const winCon = [[1, 2, 3], [4, 5, 6], [7, 8, 9], // SIGH, should start from 0 not 1.
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]];


    const swapTurn = function (p1, p2) {
        if (p1.turn) {
            p1.turn = false;
            p2.turn = true;
        } else {
            p1.turn = true;
            p2.turn = false;
        }

    }

    const checkValidInput = function (index) {
        return board[index] === '';
    }

    const checkWin = (board, marker) => {
        for (let con of winCon) {
            if (board[con[0] - 1] === marker && board[con[1] - 1] === marker && board[con[2] - 1] === marker) {
                return true;
            }
        }
        return false;
    }

    const checkDraw = (board) => {
        for (let b of board) {
            if (b === '') return true;
        }
        return false;
    }

    const playAgain = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        marker = "X";
    }

    const putMarker = function (player, i) {
        if (!gameOver) {
            if (checkValidInput(i)) {
                board[i] = player.getMarker();
                if (checkWin(board, player.getMarker())) {
                    // alert(`game is over! ${player.getName()} wins`);
                    winnerDeclaration.textContent = `Winner is ${player.getName()}`
                    gameOver = true;
                    return;
                }
                if (!checkDraw(board)) {
                    gameOver = true;
                    winnerDeclaration.textContent = "It is a Draw!";
                    return;
                }
            }
        }
    }
    allCell.forEach((c, i) => {
        c.addEventListener('click', clickHandler, { once: true });
    });

    return { putMarker, swapTurn, playAgain };


}();



let playerOneName = prompt("What is your name?: ");
(playerOneName ? p1.textContent = `Player1: ${playerOneName}` : p1.textContent = `Player1: Unknown`);
const player1 = player(playerOneName || "Unknown", 'X', true);
const player2 = player("Dan N", "O", false);


const restartGame = function (e) {
    TicTacToe.playAgain();
    allCell.forEach((c, i) => {
        c.textContent = '';
        // c.removeEventListener('click', f, {once: true })
        c.addEventListener('click', clickHandler, { once: true });
    });
    winnerDeclaration.textContent = '';
}

restartBtn.addEventListener('click', restartGame);
