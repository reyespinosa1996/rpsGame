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

function playRound(humanChoice, computerChoice) {
  if (humanChoice == "rock" && computerChoice == "scissors") {
        console.log("You win! Rock beats Scissors”");
        humanScore =+ 1;
    } else if (humanChoice == "rock" && computerChoice == "paper"){
        console.log("You lose! Paper beats Rock”");
        computerScore =+ 1;
    } else if (humanChoice == "scissors" && computerChoice == "paper") {
        console.log("You win! Scissors beats Paper");
        humanScore =+ 1;
    } else if (humanChoice == "scissors" && computerChoice == "rock") {
        console.log("You lose! Rock beats Scissors”");
        computerScore =+ 1;
    } else if (humanChoice == "paper" && computerChoice == "rock") {
        console.log("You win! Paper beats Rock”");
        humanScore =+ 1;
    } else if (humanChoice == "paper" && computerChoice == "scissors"){
        console.log("You lose! Scissors beats Paper");
    } else {
        console.log("It's a draw!")
        computerScore =+ 1;
    }
  }
  
  const humanSelection = getHumanChoice();
  const computerSelection = getComputerChoice();
  
  playRound(humanSelection, computerSelection);