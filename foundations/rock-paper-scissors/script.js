const MAX_ROUND = 3;
const ALLOWED_MOVES = ["rock", "paper", "scissors"];
const RESULT_MESSAGES = {
  win: "Congratulations! You Win!",
  lose: "Oh no! You lost!",
  draw: "Wow! It\'s a tie!",
};
const playButtonEl = document.querySelector("#startBtn");
const gamePlayAreaEl = document.querySelector(".game-play-area");
const computerChoiceEl = document.querySelector(".computer-choice-text");
const roundMessageEl = document.querySelector(".round-message");
const roundScoreEl = document.querySelector(".round-score");
const scoreBoardEl = document.querySelector(".scoreboard");
const scoreTitleEl = document.querySelector(".score-title");
const scoreValueEl = document.querySelector(".score-value");
let COMPUTER_SCORE = 0;
let HUMAN_SCORE = 0;

const getComputerChoice = () => {
  const num = Math.floor(Math.random() * 10);
  if (num < 4) return ALLOWED_MOVES[0];
  else if (num >= 4 && num <= 6) return ALLOWED_MOVES[1];
  return ALLOWED_MOVES[2];
};

const playRound = (computerChoice, humanChoice) => {
  computerChoiceEl.textContent = computerChoice.toUpperCase();
  if (humanChoice === computerChoice) {
    roundMessageEl.textContent = RESULT_MESSAGES.draw;
    roundScoreEl.textContent = `${humanChoice} X ${computerChoice}`;
  } else if (
    (humanChoice === ALLOWED_MOVES[0] && computerChoice === ALLOWED_MOVES[2]) ||
    (humanChoice === ALLOWED_MOVES[2] && computerChoice === ALLOWED_MOVES[1]) ||
    (humanChoice === ALLOWED_MOVES[1] && computerChoice === ALLOWED_MOVES[0])
  ) {
    HUMAN_SCORE += 1;
    roundMessageEl.textContent = RESULT_MESSAGES.win;
    roundScoreEl.textContent = `${humanChoice} beats ${computerChoice}`;
  } else {
    COMPUTER_SCORE += 1;
    roundMessageEl.textContent = RESULT_MESSAGES.lose;
    roundScoreEl.textContent = `${humanChoice} lose ${computerChoice}`;
  }
};

const showScoreResult = () => {
  gamePlayAreaEl.style.display = "none";
  scoreBoardEl.style.display = "flex";
  scoreTitleEl.textContent =
    HUMAN_SCORE > COMPUTER_SCORE ? RESULT_MESSAGES.win : RESULT_MESSAGES.lose;
  scoreValueEl.textContent = `${HUMAN_SCORE} X ${COMPUTER_SCORE}`;
  playButtonEl.style.display = "flex";
  return;
};

function playGame(event) {
  COMPUTER_SCORE = 0;
  HUMAN_SCORE = 0;
  console.log({ COMPUTER_SCORE, HUMAN_SCORE });
  playButtonEl.style.display = "none";
  scoreBoardEl.style.display = "none";
  roundMessageEl.textContent = "";
  roundScoreEl.textContent = "";
  gamePlayAreaEl.style.display = "flex";
  computerChoiceEl.textContent = "";
  const buttons = document.querySelectorAll("[data-name]");
  for (const button of buttons) {
    button.addEventListener("click", (event) => {
      const humanChoice = event.target.attributes[1].value;
      let computerChoice = getComputerChoice();
      playRound(computerChoice, humanChoice);
      if (COMPUTER_SCORE + HUMAN_SCORE === MAX_ROUND) {
        showScoreResult();
      }
    });
  }
}

playButtonEl.addEventListener("click", playGame);
