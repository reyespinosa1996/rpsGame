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
let currentMode = "vs-computer";
let currentPlayer = "player1";
let player1Name = "Player 1";
let player2Name = "Player 2";

const roundResult = document.querySelector("#round-result");
const scoreDisplay = document.querySelector("#score");
const winnerDisplay = document.querySelector("#winner");
const buttons = document.querySelectorAll(".choice");
const restartButton = document.querySelector("#restart");

// Mode selection elements
const modeSelection = document.getElementById("mode-selection");
const vsComputerBtn = document.querySelector(".vs-computer");
const vsPlayerBtn = document.querySelector(".vs-player");

// Multiplayer setup elements
const multiplayerSetup = document.getElementById("multiplayer-setup");
const startMultiplayerBtn = document.getElementById("start-multiplayer");
const player1NameInput = document.getElementById("player1-name");
const player2NameInput = document.getElementById("player2-name");

// Current player indicator
const currentPlayerEl = document.getElementById("current-player");
const playerTurnDisplay = document.getElementById("player-turn");

function initMultiplayerNames() {
    player1Name = player1NameInput.value || "Player 1";
    player2Name = player2NameInput.value || "Player 2";
    playerTurnDisplay.textContent = `${player1Name}'s turn`;
}

function showCurrentPlayer() {
    currentPlayerEl.classList.remove("hidden");
    if (currentMode === "vs-player") {
        playerTurnDisplay.textContent = `${currentPlayer === "player1" ? player1Name : player2Name}'s turn`;
    } else {
        playerTurnDisplay.textContent = "Your turn";
    }
}

function hideCurrentPlayer() {
    currentPlayerEl.classList.add("hidden");
}

vsComputerBtn.addEventListener("click", () => {
    currentMode = "vs-computer";
    modeSelection.classList.add("hidden");
    multiplayerSetup.classList.add("hidden");
    initGame();
});

vsPlayerBtn.addEventListener("click", () => {
    currentMode = "vs-player";
    modeSelection.classList.add("hidden");
    multiplayerSetup.classList.remove("hidden");
});

startMultiplayerBtn.addEventListener("click", () => {
    initMultiplayerNames();
    multiplayerSetup.classList.add("hidden");
    initGame();
});

function initGame() {
    modeSelection.classList.add("hidden");
    humanScore = 0;
    computerScore = 0;
    gameOver = false;
    currentPlayer = "player1";

    if (currentMode === "vs-player") {
        showCurrentPlayer();
    }

    roundResult.textContent = "";
    winnerDisplay.textContent = "";
    restartButton.hidden = true;
    buttons.forEach((button) => (button.disabled = false));
    setupModeSpecificListeners();
}

function setupModeSpecificListeners() {
    if (currentMode === "vs-computer") {
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                if (gameOver) return;
                playRound(button.id, getComputerChoice());
            });
        });
    } else if (currentMode === "vs-player") {
        let player1Choice = null;

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                if (gameOver) return;

                if (currentPlayer === "player1") {
                    // Player 1 makes a choice
                    player1Choice = button.id;
                    // Switch to player 2's turn
                    currentPlayer = "player2";
                    showCurrentPlayer();
                    // Disable buttons until player 2 picks
                    buttons.forEach((btn) => btn.disabled = true);
                } else if (currentPlayer === "player2" && player1Choice !== null) {
                    // Player 2 makes a choice - determine result
                    playRound(button.id, player1Choice);
                    // Reset for next round
                    player1Choice = null;
                    currentPlayer = "player1";
                    showCurrentPlayer();
                    // Re-enable buttons
                    buttons.forEach((btn) => btn.disabled = false);
                }
            });
        });
    }
}

function playRound(humanChoice, computerChoice) {
    const winConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };

    if (computerChoice === null) {
        return;
    }

    if (humanChoice === computerChoice) {
        roundResult.textContent = "It's a draw!";
    } else if (winConditions[humanChoice] === computerChoice) {
        humanScore++;
        roundResult.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
    } else {
        computerScore++;
        roundResult.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
    }

    scoreDisplay.textContent = `Score — ${player1Name}: ${humanScore} | ${player2Name}: ${computerScore}`;

    if (humanScore === 5 || computerScore === 5) {
        gameOver = true;
        winnerDisplay.textContent =
            humanScore === 5 ? `${player1Name} wins the game!` : `${player2Name} wins the game!`;
        buttons.forEach((button) => (button.disabled = true));
        restartButton.hidden = false;
        restartButton.focus();
    }
}

function restartGame() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;
    currentPlayer = "player1";

    roundResult.textContent = "";
    scoreDisplay.textContent = `Score — ${player1Name}: 0 | ${player2Name}: 0`;
    winnerDisplay.textContent = "";
    restartButton.hidden = true;
    buttons.forEach((button) => (button.disabled = false));

    hideCurrentPlayer();

    currentMode = "vs-computer";
    modeSelection.classList.remove("hidden");
}

// Original event listeners
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (gameOver) return;
        if (currentMode === "vs-computer") {
            playRound(button.id, getComputerChoice());
        }
    });
});

restartButton.addEventListener("click", restartGame);
