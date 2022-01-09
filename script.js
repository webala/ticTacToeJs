const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const  WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
let circleTurn;


restartButton.addEventListener('click', startGame);


const setBoardHover = () => {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}

function startGame () {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHover();
    winningMessageElement.classList.remove('show');
}

startGame();

function handleClick (e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    //placeMark
    placeMark(cell, currentClass);
    //Check for win
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }else {
        swapTurns();
        setBoardHover();
    }
    }
    //Check for draw
    //Switch turns


const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
} 

const swapTurns = () => {
    circleTurn = !circleTurn;
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw';
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's": "X's"} Wins!`;
    }
    winningMessageElement.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination =>{
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
