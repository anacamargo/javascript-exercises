let computerScore = 0;
let humanScore = 0;

const getComputerChoice = () => {
  const num = Math.floor(Math.random() * 10);
  if (num < 4) return "Rock";
  else if (num >= 4 && num <= 6) return "Paper";
  return "Scissors";
};

const getHumanChoice = () => {
  const answer = prompt("Type rock, paper or scissors");
  return capitalizeString(answer);
};

const capitalizeString = (str) => {
  const lowerStr = str.toLowerCase();
  const arr = Array.from(lowerStr);
  arr[0] = arr[0].toUpperCase();
  return arr.join("");
};

const playRound = (computerChoice, humanChoice) => {
  if (
    (humanChoice === "Rock" && computerChoice === "Scissors") ||
    (humanChoice === "Scissors" && computerChoice === "Paper") ||
    (humanChoice === "Paper" && computerChoice === "Rock")
  ) {
    humanScore += 1;
    return console.log(`You win! ${humanChoice} beats ${computerChoice}`);
  }
  computerScore += 1;
  return console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
};

function playGame() {
  for (let i = 0; i < 5; i++) {
    let computerChoice = getComputerChoice();
    let humanChoice = getHumanChoice();
    while (humanChoice === computerChoice) {
      console.log("It's tie! Let's play again!");
      computerChoice = getComputerChoice();
      humanChoice = getHumanChoice();
    }
    playRound(computerChoice, humanChoice);
  }
  return console.log(humanScore);
}

playGame();
