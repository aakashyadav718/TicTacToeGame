const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.getElementById('restartBtn');
const boardElement = document.querySelector('.board');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const createWinningLine = (start, end) => {
  const line = document.createElement('div');
  line.classList.add('winning-line');
  boardElement.appendChild(line);
  
  const startCell = cells[start].getBoundingClientRect();
  const endCell = cells[end].getBoundingClientRect();
  
  const boardRect = boardElement.getBoundingClientRect();
  
  const x1 = startCell.left + startCell.width / 2 - boardRect.left;
  const y1 = startCell.top + startCell.height / 2 - boardRect.top;
  const x2 = endCell.left + endCell.width / 2 - boardRect.left;
  const y2 = endCell.top + endCell.height / 2 - boardRect.top;
  
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  
  line.style.width = `${length}px`;
  line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
};

const checkWinner = () => {
  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    let a = board[winCondition[0]];
    let b = board[winCondition[1]];
    let c = board[winCondition[2]];
    if (a === '' || b === '' || c === '') continue;
    if (a === b && b === c) {
      roundWon = true;
      createWinningLine(winCondition[0], winCondition[2]);
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusText.textContent = 'Draw!';
    gameActive = false;
  }
};

const handleCellClick = (e) => {
  const clickedCellIndex = e.target.getAttribute('data-index');
  if (board[clickedCellIndex] !== '' || !gameActive) return;

  board[clickedCellIndex] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const restartGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player X's turn`;
  cells.forEach(cell => cell.textContent = '');
  
  const winningLine = document.querySelector('.winning-line');
  if (winningLine) winningLine.remove();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

