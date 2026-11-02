function getComputerChoice() {
    const randomNumber = Math.random();

    if (randomNumber < 0.33) {
        return "rock";
    } else if (randomNumber < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

let humanScore = 0;
let computerScore = 0;
let gameOver = false;

const roundResult = document.querySelector("#round-result");
const scoreDisplay = document.querySelector("#score");
const winnerDisplay = document.querySelector("#winner");
const buttons = document.querySelectorAll(".choice");
const restartButton = document.querySelector("#restart");

function playRound(humanChoice, computerChoice) {
    const winConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    if (humanChoice === computerChoice) {
        roundResult.textContent = "It's a draw!";
    } else if (winConditions[humanChoice] === computerChoice) {
        humanScore++;
        roundResult.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        roundResult.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
    }

    scoreDisplay.textContent = `Score — You: ${humanScore} | Computer: ${computerScore}`;

    if (humanScore === 5 || computerScore === 5) {
        gameOver = true;
        winnerDisplay.textContent =
            humanScore === 5 ? "You win the game!" : "Computer wins the game!";
        buttons.forEach((button) => (button.disabled = true));
        restartButton.hidden = false;
        restartButton.focus();
    }
}

function restartGame() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;
    roundResult.textContent = "";
    scoreDisplay.textContent = "Score — You: 0 | Computer: 0";
    winnerDisplay.textContent = "";
    restartButton.hidden = true;
    buttons.forEach((button) => (button.disabled = false));
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (gameOver) return;
        playRound(button.id, getComputerChoice());
    });
});

restartButton.addEventListener("click", restartGame);
