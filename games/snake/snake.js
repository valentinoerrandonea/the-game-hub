getPokemonImage()
const canvas = document.getElementById("game-board");
const ctx = canvas.getContext("2d");
const gameOverElement = document.getElementById("game-over");
const restartButton = document.getElementById("restart");
const scoreElement = document.getElementById("score");
const highscoreElement = document.getElementById("highscore");
const cellSize = 20;
const numRows = 30;
const numCols = 30;
let pokemonImage = null

const fruitImage = new Image();
fruitImage.src = '../../assets/snake/fruit.png';

fruitImage.addEventListener('load', startGame);


const snakeImage = new Image();
snakeImage.src = '../../assets/snake/snake.png';


canvas.width = cellSize * numCols;
canvas.height = cellSize * numRows;

let snake = [{ x: Math.floor(numCols / 2), y: Math.floor(numRows / 2) }];
let direction = "right";
let score = 0;
let highscore = localStorage.getItem("highscore") || 0;
let interval;

highscoreElement.innerText = highscore;

restartButton.addEventListener("click", startGame);

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
    case "W":
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "a":
    case "A":
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "s":
    case "S":
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "d":
    case "D":
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

function drawCell(position, value) {
  if (value === "snake") {
    if (pokemonImage) {
      ctx.drawImage(pokemonImage, position.x * cellSize, position.y * cellSize, cellSize, cellSize);
    } else {
      ctx.fillStyle = "black";
      ctx.fillRect(position.x * cellSize, position.y * cellSize, cellSize, cellSize);
    }
  } else if (value instanceof Image) {
    ctx.drawImage(value, position.x * cellSize, position.y * cellSize, cellSize, cellSize);
  } else {
    ctx.fillStyle = value;
    ctx.fillRect(position.x * cellSize, position.y * cellSize, cellSize, cellSize);
  }
}




function clearCell(position) {
  drawCell(position, "rgba(0, 0, 0, 1)");
}

function isSnake(position, ignoreHead = false) {
  return snake.some((cell, index) => {
    if (ignoreHead && index === 0) return false;
    return cell.x === position.x && cell.y === position.y;
  });
}


function createFruit() {
  let x;
  let y;

  do {
    x = Math.floor(Math.random() * numCols);
    y = Math.floor(Math.random() * numRows);
  } while (isSnake({ x, y }));

  fruit = { x, y };
  drawCell(fruit, fruitImage);
}



function startGame() {
  clearInterval(interval);
  snake = [{ x: Math.floor(numCols / 2), y: Math.floor(numRows / 2) }];
  direction = "right";
  score = 0;
  scoreElement.innerText = score;
  gameOverElement.style.display = "none";
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  createFruit();
  drawCell(snake[0], snakeImage);

  interval = setInterval(moveSnake, 100);
}

function gameOver() {
  clearInterval(interval);
  gameOverElement.style.display = "block";
}

function moveSnake() {
  let newX = snake[0].x;
  let newY = snake[0].y;

  switch (direction) {
    case "up":
      newY--;
      break;
    case "down":
      newY++;
      break;
    case "left":
      newX--;
      break;
    case "right":
      newX++;
      break;
  }

  // Verifica si la serpiente ha chocado con los bordes o consigo misma antes de actualizar la posición de la cabeza
  if (newX < 0 || newY < 0 || newX >= numCols || newY >= numRows || isSnake({ x: newX, y: newY })) {
    gameOver();
    return;
  }

  const hasEatenFruit = newX === fruit.x && newY === fruit.y;
  if (!hasEatenFruit) {
    clearCell(snake[snake.length - 1]);
    snake.pop();
  }

  snake.unshift({ x: newX, y: newY }); // Mueve esta línea después de verificar la colisión
  drawCell(snake[0], 'snake');

  if (hasEatenFruit) {
    score++;
    scoreElement.innerText = score;
    if (score > highscore) {
      highscore = score;
      highscoreElement.innerText = highscore;
      localStorage.setItem("highscore", highscore);
    }
    createFruit();
  }
}

startGame()
