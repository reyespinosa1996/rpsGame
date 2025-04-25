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

function getHumanChoice() {

    let userInput = prompt("Enter rock, paper, or scissors:");
    userInput = userInput.toLowerCase()
    return userInput;
}

let humanScore = 0;
let computerScore = 0;

//  const humanSelection = getHumanChoice();
//  const computerSelection = getComputerChoice();
  
//  playRound(humanSelection, computerSelection);

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    const roundsToPlay = 5;
    
    for (let rounds = 0; rounds < roundsToPlay; rounds++) {
        const humanSelection = getHumanChoice();
        const computerSelection = getComputerChoice();
        const result = playRound(humanSelection, computerSelection);
        
        if (result === "human") {
            humanScore++;
        } else if (result === "computer") {
            computerScore++;
        }
        
        console.log("Human score: " + humanScore);
        console.log("Computer score: " + computerScore);
    }
}

function playRound(humanChoice, computerChoice) {
    const winConditions = {
        rock: "scissors",
        paper: "rock",
        scissors: "paper"
    };
    
    if (humanChoice === computerChoice) {
        console.log("It's a draw!");
        return "draw";
    }
    
    if (winConditions[humanChoice] === computerChoice) {
        console.log(`You win! ${humanChoice} beats ${computerChoice}`);
        return "human";
    } else {
        console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
        return "computer";
    }
}
playGame();
