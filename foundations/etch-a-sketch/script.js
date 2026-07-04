const DEFAULT_GRID_SIZE = 16;
const DEFAULT_LIGHTNESS = 83;
const GRID_SIZE_PROMPT_MESSAGE = "Type a number between 1 and 100";
const gridAreaEl = document.querySelector(".drawing-canvas");
const changeSizeButtonEl = document.querySelector("#resize-btn");
const clearGridButtonEl = document.querySelector("#clear-btn");
let isDrawing = false;

if (!gridAreaEl || !changeSizeButtonEl || !clearGridButtonEl) {
  throw new Error("DOM elements not found");
}

const handleGridSizeChange = () => {
  const userInput = prompt(GRID_SIZE_PROMPT_MESSAGE, DEFAULT_GRID_SIZE);
  if (userInput === "" || userInput === null) return;
  if (!Number(userInput)) return alert(GRID_SIZE_PROMPT_MESSAGE);
  const inputSize = parseInt(userInput, 10);
  if (inputSize > 100 || inputSize < 1) return alert(GRID_SIZE_PROMPT_MESSAGE);
  gridAreaEl.dataset.size = inputSize;
  clearGrid();
  createGrid(inputSize);
};

const clearGrid = () => {
  gridAreaEl.replaceChildren();
};

const handleGridClean = () => {
  clearGrid();
  const currentGridSize =
    parseInt(gridAreaEl.dataset.size) || DEFAULT_GRID_SIZE;
  createGrid(currentGridSize);
};

const createGrid = (gridSize) => {
  gridAreaEl.style.setProperty("--grid-size", gridSize);
  for (let i = 0; i < gridSize ** 2; i++) {
    const divEl = document.createElement("div");
    divEl.dataset.lightness = DEFAULT_LIGHTNESS;
    divEl.classList.add("square");
    gridAreaEl.appendChild(divEl);
  }
};

const handleDrawStart = (event) => (isDrawing = true);

const handleDraw = (event) => {
  const targetSquareEl = event.target.closest(".square");
  if (targetSquareEl && isDrawing) {
    const currentLightnessValue = parseInt(targetSquareEl.dataset.lightness);
    const newLightnessValue = Math.max(0, currentLightnessValue - 10);
    targetSquareEl.style.backgroundColor = `hsl(0 0% ${newLightnessValue}%)`;
    targetSquareEl.dataset.lightness = newLightnessValue;
  }
};
const handleDrawStop = () => (isDrawing = false);

createGrid(DEFAULT_GRID_SIZE);
clearGridButtonEl.addEventListener("click", handleGridClean);
changeSizeButtonEl.addEventListener("click", handleGridSizeChange);
gridAreaEl.addEventListener("mousedown", handleDrawStart);
gridAreaEl.addEventListener("mousemove", handleDraw);
gridAreaEl.addEventListener("mouseup", handleDrawStop);
gridAreaEl.addEventListener("mouseleave", handleDrawStop);
