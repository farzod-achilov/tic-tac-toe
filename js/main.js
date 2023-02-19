// HTML elements
const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");
const restartButton = document.querySelector(".restart-btn");

// Game variables
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Functions
function displayMessage(msg) {
  message.textContent = msg;
}

function handleCellClick(cell, index) {
  if (gameBoard[index] !== "") {
    displayMessage("That cell has already been played!");
    return;
  }

  cell.textContent = currentPlayer;
  gameBoard[index] = currentPlayer;

  if (checkForWin()) {
    displayMessage(`Player ${currentPlayer} wins!`);
    disableCells();
    return;
  }

  if (checkForTie()) {
    displayMessage("It's a tie!");
    return;
  }

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  displayMessage(`It's ${currentPlayer}'s turn!`);
}

function checkForWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const [a, b, c] = winConditions[i];

    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      return true;
    }
  }

  return false;
}

function checkForTie() {
  return !gameBoard.includes("");
}

function disableCells() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", handleCellClick);
  });

  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  displayMessage(`It's ${currentPlayer}'s turn!`);
}

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleCellClick(cell, index));
});

restartButton.addEventListener("click", restartGame);

// Initial message
displayMessage(`It's ${currentPlayer}'s turn!`);
