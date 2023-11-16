const table = document.getElementsByClassName("table")[0];

const width = 400;
const height = 400;
const resolution = 20;

const rows = height / resolution;
const cols = width / resolution;

function makeGrid(rows, cols) {
  const grid = []; // Nouvelle grille pour stocker les valeurs

  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    const gridRow = []; // Nouvelle ligne dans la grille

    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.addEventListener("click", toggleCell);
      row.appendChild(cell);
      gridRow.push(row); // Initialiser la valeur de chaque cellule à 0
    }

    grid.push(gridRow); // Ajouter la ligne à la grille
    table.appendChild(row);
  }

  return grid; // Retourner la grille créée
}

function toggleCell() {
  if (this.style.backgroundColor === "black") {
    this.style.backgroundColor = "white";
  } else {
    this.style.backgroundColor = "black";
  }
}

function initgrid(rows, cols) {
  const grid = makeGrid(rows, cols);

  // Vous pouvez maintenant accéder à chaque cellule de la grille
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
      console.log(grid[i][j]);
    }
  }
}

initgrid(rows, cols);
