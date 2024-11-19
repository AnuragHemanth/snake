// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

// Game settings
let score = 0;
let lives = 3; // Start with 3 lives
let snake = [{ x: 160, y: 160 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
const gridSize = 20;

// Food icons
const foodImages = {
  apple: new Image(),
  banana: new Image(),
  cherry: new Image(),
  orange: new Image()
};
foodImages.apple.src = 'images/apple.png';
foodImages.banana.src = 'images/banana.png';
foodImages.cherry.src = 'images/cherry.png';
foodImages.orange.src = 'images/orange.png';

const foodTypes = ['apple', 'banana', 'cherry', 'orange'];
let currentFoodType = 'apple';

// Function to update the score display
function updateScore() {
  document.getElementById('score').textContent = score;
}

// Function to update the lives display
function updateLives() {
  document.getElementById('lives').textContent = lives;
}

// Function to set a random food type
function setRandomFoodType() {
  const randomIndex = Math.floor(Math.random() * foodTypes.length);
  currentFoodType = foodTypes[randomIndex];
}

// Update snake position and check for collisions with food
function updateSnake() {
  const head = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };
  snake.unshift(head);

  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
    setRandomFoodType();
  } else {
    snake.pop();
  }
}

// Draw the snake and food on the canvas
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake with a unique style
  ctx.fillStyle = '#00FF7F';
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? 'lightgreen' : '#00FF7F'; // Lighter color for the snake head
    ctx.fillRect(part.x, part.y, gridSize, gridSize);
  });

  // Draw the food icon with a larger size for the orange
  const foodIcon = foodImages[currentFoodType];
  if (currentFoodType === 'orange') {
    ctx.drawImage(foodIcon, food.x, food.y, gridSize * 1.5, gridSize * 1.5); // Larger size for orange
  } else {
    ctx.drawImage(foodIcon, food.x, food.y, gridSize, gridSize);
  }
}

// Check for collisions with walls or self
function checkCollision() {
  // Check wall collision
  if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
    handleCollision();
  }
  // Check self-collision
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      handleCollision();
    }
  }
}

// Handle collision and reduce lives or reset the game
function handleCollision() {
  lives--;
  updateLives();
  if (lives === 0) {
    alert("Game Over! You've run out of lives.");
    resetGame();
  } else {
    resetSnakePosition();
  }
}

// Reset the snake's position without resetting the lives
function resetSnakePosition() {
  snake = [{ x: 160, y: 160 }];
  direction = { x: 0, y: 0 };
  food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
}

// Reset the entire game
function resetGame() {
  score = 0;
  lives = 3;
  updateScore();
  updateLives();
  resetSnakePosition();
}

// Game loop
function gameLoop() {
  updateSnake();
  checkCollision();
  drawGame();
  setTimeout(gameLoop, 100);
}

// Keyboard controls for the snake
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
  if (e.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
  if (e.key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
  if (e.key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
});

// Initialize the game
updateScore();
updateLives();
gameLoop();
