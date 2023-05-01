const randomNum = () => Math.floor(Math.random() * 10) + 1;

const theNumber = randomNum()

if (theNumber <= 6) {
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
            title: "You won!",
            text: "Congratulations! You won the Impossible Tic-Tac-Toe",
            icon: "success",
            confirmButtonText: "Play Again",
            allowOutsideClick: false,
            background: '#212121',
            color: '#FFFF',
            confirmButtonColor: '#FF4545'
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
            title: "Tie!",
            text: "It's a tie! Try again!",
            icon: "info",
            confirmButtonText: "Play Again",
            allowOutsideClick: false,
            background: '#212121',
            color: '#FFFF',
            confirmButtonColor: '#FF4545'
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
                title: "You lost!",
                text: "The AI won. Better luck next time!",
                icon: "error",
                confirmButtonText: "Play Again",
                allowOutsideClick: false,
                background: '#212121',
                color: '#FFFF',
                confirmButtonColor: '#FF4545'
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

} else {
  const cells = document.querySelectorAll(".cell");
  const scoreboard = document.getElementById("scoreboard");
  let board = ['', '', '', '', '', '', '', '', ''];
  let player = 'X';
  let ai = 'O';
  let currentPlayer = player;

  function updateScoreboard() {
    const playerWins = localStorage.getItem('playerWins') || 0;
    const aiWins = localStorage.getItem('aiWins') || 0;
    scoreboard.textContent = `Jugador (${playerWins}) - (${aiWins}) AI`;
  }

  function handleClick(index) {
    if (board[index] === '') {
      board[index] = currentPlayer;
      cells[index].textContent = currentPlayer;

      if (checkWin(currentPlayer)) {
        Swal.fire({
          title: currentPlayer === player ? 'You won!' : 'The AI won!',
          text: 'Do you wanna play again?',
          icon: 'success',
          confirmButtonText: 'Play Again',
          background: '#212121',
          color: '#FFFF',
          confirmButtonColor: '#FF4545'
        }).then(() => {
          resetGame();
        });

        const key = currentPlayer === player ? 'playerWins' : 'aiWins';
        const wins = parseInt(localStorage.getItem(key) || 0) + 1;
        localStorage.setItem(key, wins);
        updateScoreboard();
      } else if (board.every(cell => cell !== '')) {
        Swal.fire({
          title: 'Tie!',
          text: 'Do you wanna play again?',
          icon: 'info',
          confirmButtonText: 'Play Again',
          background: '#212121',
          color: '#FFFF',
          confirmButtonColor: '#FF4545'
        }).then(() => {
          resetGame();
        });
      } else {
        currentPlayer = currentPlayer === player ? ai : player;
        if (currentPlayer === ai) {
          playAI();
        }
      }
    }
  }

  function playAI() {
    const emptyCells = board.reduce((empty, cell, index) => {
      if (cell === '') {
        empty.push(index);
      }
      return empty;
    }, []);

    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleClick(randomIndex);
  }

  function checkWin(player) {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winCombinations.some(combination =>
      combination.every(index => board[index] === player)
    );
  }

  function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach((cell, index) => {
      cell.textContent = '';
      board[index] = '';
    });
    currentPlayer = player;
  }

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(index));
  });

  updateScoreboard();

}




