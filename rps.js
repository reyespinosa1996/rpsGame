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
const buttons = document.querySelectorAll("button");

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
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (gameOver) return;
        playRound(button.id, getComputerChoice());
    });
});
