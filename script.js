let board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const player = {
  x: "X",
  o: "O"
};

let currentPlayer = player.x;
let countPlay = 0;
let turn = document.getElementById("turn");
let playAgain = document.getElementById("play-again");
let square = document.querySelectorAll("td");

turn.innerHTML = `Turn to play = ${currentPlayer}`;

// Reset the game to play again

const resetGame = () => {
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  square.forEach(sq => (sq.innerHTML = ""));
  turn.innerHTML = `Turn to play = ${currentPlayer}`;
  countPlay = 0;
  playAgain.className = "gone";
};

playAgain.addEventListener("click", resetGame);

//Change the next player or check the winner for display

const changePlayers = () => {
  let prevPlayer;
  if (currentPlayer === player.x) {
    prevPlayer = player.x;
    currentPlayer = player.o;
  } else {
    prevPlayer = player.o;
    currentPlayer = player.x;
  }
  if (checkWinner()) {
    turn.innerHTML = `The winner is ${prevPlayer}`;
    playAgain.className = "";
  } else if (countPlay < 9) {
    turn.innerHTML = `Turn to play = ${currentPlayer}`;
  } else {
    turn.innerHTML = `The game is tie`;
    playAgain.className = "";
  }
};

// Check if there is a winner from a row

const equalRow = row => {
  return (
    board[row][0] &&
    board[row][0] === board[row][1] &&
    board[row][1] === board[row][2]
  );
};

// Check if there is a winner from a column

const equalCol = col => {
  return (
    board[0][col] &&
    board[0][col] === board[1][col] &&
    board[1][col] === board[2][col]
  );
};

// Check if there is a winner from the diagonals

const equalDiagonal1 = () => {
  return (
    board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]
  );
};

const equalDiagonal2 = () => {
  return (
    board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]
  );
};

// Check if the game has a winner calling the functions above
// for each row, column and diagonal

const checkWinner = () => {
  if (
    equalRow(0) ||
    equalRow(1) ||
    equalRow(2) ||
    equalCol(0) ||
    equalCol(1) ||
    equalCol(2) ||
    equalDiagonal1() ||
    equalDiagonal2()
  ) {
    return true;
  } else {
    return false;
  }
};

// Check if the square clicked is null to make a play
// and if there is a winner, no more square is filled

const makePlay = evt => {
  const idx = evt.target.getAttribute("data-id").split(",");
  const row = idx[0];
  const col = idx[1];

  if (board[row][col] === null && !checkWinner()) {
    board[row][col] = currentPlayer;
    evt.target.innerHTML = board[row][col];
    countPlay++;
    changePlayers();
  }
};

square.forEach(sq => sq.addEventListener("click", makePlay));
