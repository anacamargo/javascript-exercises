const GRID_SIZE_DEFAULT = 16;
const INPUT_MESSAGE = "Digite um número inteiro entre 1 e 100";
const gridAreaEl = document.querySelector(".grid-area");
const gridSizeButtonEl = document.querySelector("#grid-size");

if (!gridAreaEl || !gridSizeButtonEl) {
  throw new Error("Elementos não encontrados no DOM");
}

const promptGridSize = () => {
  const userInput = prompt(INPUT_MESSAGE, GRID_SIZE_DEFAULT);
  if (userInput === "" || userInput === null) return;
  if (!Number(userInput)) return alert(INPUT_MESSAGE);
  const inputSize = parseInt(userInput, 10);
  if (inputSize > 100 || inputSize < 1) return alert(INPUT_MESSAGE);
  removeGrid();
  createGrid(inputSize);
};

const removeGrid = () => {
  gridAreaEl.replaceChildren();
};

const createGrid = (gridSize) => {
  gridAreaEl.style.setProperty("--grid-size", gridSize);
  for (let i = 0; i < gridSize ** 2; i++) {
    const divEl = document.createElement("div");
    divEl.classList.add("square");
    gridAreaEl.appendChild(divEl);
  }
};

createGrid(GRID_SIZE_DEFAULT);
gridSizeButtonEl.addEventListener("click", promptGridSize);
