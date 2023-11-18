const width = 400;
const height = 400;
const resolution = 20;
const rows = height / resolution;
const cols = width / resolution;

let speed = 1200;
let sumGeneration = 0;
let grid = createGrid();
let interval;

// Fonction pour créer une grille vide
function createGrid() {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row[j] = 0;
    }
    grid[i] = row;
  }
  return grid;
}

// Fonction pour initialiser la grille dans le document HTML
function initGrid() {
  const table = document.querySelector(".game");
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.addEventListener("click", function () {
        toggleCell(i, j);
      });
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

// Fonction pour mettre à jour la grille à chaque itération
function updateGrid() {
  const next = createGrid();
  let stable = true;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const state = grid[i][j];
      const sum = countNeighboors(grid, i, j);

      if (state === 0 && sum === 3) {
        next[i][j] = 1;
        if (state !== next[i][j]) {
          stable = false;
        }
      } else if (state === 1 && (sum < 2 || sum > 3)) {
        next[i][j] = 0;
        if (state !== next[i][j]) {
          stable = false;
        }
      } else {
        next[i][j] = state;
      }
    }
  }
  countGeneration();
  grid = next;
  colorGrid();
  if (stable) {
    stop();
  }
}

// Fonction pour compter le nombre de voisins d'une cellule
function countNeighboors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }

  sum -= grid[x][y];
  return sum;
}

// Fonction pour colorer la grille dans le document HTML
function colorGrid() {
  const table = document.querySelector(".game");
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = table.rows[i].cells[j];
      cell.style.backgroundColor = grid[i][j] === 1 ? "black" : "white";
    }
  }
}

// Fonction pour inverser l'état d'une cellule lorsqu'elle est cliquée
function toggleCell(i, j) {
  grid[i][j] = 1 - grid[i][j];
  colorGrid();
}

// Fonction pour démarrer le jeu à un intervalle de temps donné
function start() {
  interval = setInterval(updateGrid, speed);
}

// Fonction pour arrêter le jeu
function stop() {
  clearInterval(interval);
}

// Fonction pour réinitialiser le jeu
function reset() {
  stop();
  grid = createGrid();
  colorGrid();
}

// Fonction pour ajuster la vitesse du jeu en fonction de la valeur du slider
function adjustSpeed() {
  console.log("adjusting speed");
  speedDis = Math.floor(document.getElementById("speedSlider").value / 100);
  speed = 1000 - speedDis * 100;
  document.getElementById("speedDisplay").innerText = speedDis;
  stop();
  start();
}

// Fonction pour compter le nombre de générations
function countGeneration() {
  sumGeneration++;
  document.getElementById("genDisplay").innerText = sumGeneration;
}

// Initialisation de la grille au chargement de la page
initGrid();
