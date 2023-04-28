const cells = document.querySelectorAll(".cell");
const board = ["", "", "", "", "", "", "", "", ""];
let playerTurn = true;

function makeMove(index) {
  if (board[index] === "" && playerTurn) {
    board[index] = "X";
    cells[index].innerText = "X";

    if (checkWin(board, "X")) {
      setTimeout(() => {
        Swal.fire({
          title: "Ganaste",
          text: "¡Felicidades! Le ganaste a la IA.",
          icon: "success",
          confirmButtonText: "Jugar de nuevo",
          allowOutsideClick: false
        }).then(() => location.reload());
        let playerWins = localStorage.getItem("playerWins") || 0;
        localStorage.setItem("playerWins", parseInt(playerWins) + 1);
        updateScoreboard();
      }, 100);
      return;
    }

    if (isBoardFull(board)) {
      setTimeout(() => {
        Swal.fire({
          title: "Empate",
          text: "¡Es un empate! Inténtalo de nuevo.",
          icon: "info",
          confirmButtonText: "Jugar de nuevo",
          allowOutsideClick: false
        }).then(() => location.reload());
      }, 100);
    } else {
      playerTurn = false;
      setTimeout(() => {
        const move = bestMove();
        board[move] = "O";
        cells[move].innerText = "O";
        if (checkWin(board, "O")) {
          setTimeout(() => {
            Swal.fire({
              title: "Perdiste",
              text: "La IA ganó. ¡Mejor suerte la próxima vez!",
              icon: "error",
              confirmButtonText: "Jugar de nuevo",
              allowOutsideClick: false
            }).then(() => location.reload());
            let aiWins = localStorage.getItem("aiWins") || 0;
            localStorage.setItem("aiWins", parseInt(aiWins) + 1);
            updateScoreboard();
          }, 100);
        }
        playerTurn = true;
      }, 100);
    }
  }
}

function checkWin(board, player) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winConditions.some(combination => {
    return (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    );
  });
}

function isBoardFull(board) {
  return board.every(cell => cell !== "");
}

function updateScoreboard() {
  const playerWins = localStorage.getItem("playerWins") || 0;
  const aiWins = localStorage.getItem("aiWins") || 0;
  document.getElementById("scoreboard").innerText = `Player ${playerWins} - ${aiWins} AI`;
}

function bestMove() {
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = "O";
      const score = minimax(board, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, maximizingPlayer) {
  if (checkWin(board, "O")) return 1;
  if (checkWin(board, "X")) return -1;
  if (isBoardFull(board)) return 0;

  if (maximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "O";
        const score = minimax(board, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = "X";
        const score = minimax(board, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

updateScoreboard();
