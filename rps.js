function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getComputerChoice() {
    let rock = "Rock";
    let paper = "Paper";
    let scissors = "Scissors";
    let returnedValue = "";
    let randomInt = (getRandomInt(3));

    if (randomInt == 0) {
        returnedValue = rock;
    } else if (randomInt == 1) {
        returnedValue = paper;
    }else {
        returnedValue = scissors;
    }
}

function getHumanChoice(value) {
    let humanChoise = prompt("Insert your choice:");
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
    humanChoice = getHumanChoice();
    computerChoice = getComputerChoice();
    console.log(humanChoice);
}