const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (cell.textContent !== '' || !gameActive) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        gameActive = false;
        messageElement.textContent = `${currentPlayer} wins! 🎉`;
        highlightWinningCells();
    } else if (isDraw()) {
        gameActive = false;
        messageElement.textContent = `It's a draw! 😕`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin(currentPlayer) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return Array.from(cells).every(cell => {
        return cell.textContent !== '';
    });
}

function highlightWinningCells() {
    WINNING_COMBINATIONS.forEach(combination => {
        if (combination.every(index => cells[index].textContent === currentPlayer)) {
            combination.forEach(index => {
                cells[index].style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            });
        }
    });
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.style.backgroundColor = '';
    });
    messageElement.textContent = '';
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);
