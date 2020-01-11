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
let turn = document.getElementById("turn");
turn.innerHTML = `Turn to play = ${currentPlayer}`;
let square = document.querySelectorAll("td");

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
  } else {
    turn.innerHTML = `Turn to play = ${currentPlayer}`;
  }
};

const equalRow = row => {
  return (
    board[row][0] &&
    board[row][0] === board[row][1] &&
    board[row][1] === board[row][2]
  );
};

const equalCol = col => {
  return (
    board[0][col] &&
    board[0][col] === board[1][col] &&
    board[1][col] === board[2][col]
  );
};

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

const makePlay = evt => {
  const idx = evt.target.getAttribute("data-id").split(",");
  const row = idx[0];
  const col = idx[1];
  if (board[row][col] === null && !checkWinner()) {
    board[row][col] = currentPlayer;
    evt.target.innerHTML = board[row][col];
    changePlayers();
  }
};

square.forEach(sq => sq.addEventListener("click", makePlay));
