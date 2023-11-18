const width = 400;
const height = 400;
const resolution = 20;
const rows = height / resolution;
const cols = width / resolution;

let grid = createGrid();
let interval;

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

function updateGrid() {
  const next = createGrid();

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const state = grid[i][j];
      const sum = countNeighboors(grid, i, j);

      if (state === 0 && sum === 3) {
        next[i][j] = 1;
      } else if (state === 1 && (sum < 2 || sum > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
  colorGrid();
}

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

function colorGrid() {
  const table = document.querySelector(".game");
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = table.rows[i].cells[j];
      cell.style.backgroundColor = grid[i][j] === 1 ? "black" : "white";
    }
  }
}

function toggleCell(i, j) {
  grid[i][j] = 1 - grid[i][j];
  colorGrid();
}

function start() {
  interval = setInterval(updateGrid, 100);
}

function stop() {
  clearInterval(interval);
}

function reset() {
  stop();
  grid = createGrid();
  colorGrid();
}
initGrid();
