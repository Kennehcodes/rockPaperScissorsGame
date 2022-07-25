    //logic for rock paper scissors implementation
    //additional fun flare: create two user names for each player.
const PLAYER1 = "Computer";
//Error checking to ensure that the username is not empty or too long.
let playerUserName = "";
do {
    playerUserName = prompt("What is your name?").toLowerCase(); //Cleaning the data.
    }
while (playerUserName.length === 0 || playerUserName.length > 30)

    let firstUserNameLetter = playerUserName[0].toUpperCase();
const PLAYER2 = playerUserName.replace(playerUserName[0], firstUserNameLetter);

console.log("Welcome " + PLAYER2 +"! \n\nAre you ready to play Rock Paper Scissors with the " + PLAYER1 + "?");


    //problem to break down:
    //game rules:
        //players can do three things: rock, paper or scissors
const PLAYS = ["Rock", "Paper", "Scissors"];
const playsLower = PLAYS.map(e => {return e.toLowerCase();})

        //declare moves as a global const array

function getComputerChoice() {
    //computer needs to pick a move getComputerChoice()
    //a random choice is generated from the global three moves options
        //using the math library allow for a choice to be picked from the moves array. (Allows for scalability vs hardcoding). 
    let randomMove = (Math.floor(Math.random()*playsLower.length + 1)) - (1);  //final negative one accounts for array index
    return playsLower[randomMove];
}

function getUserChoice() {
    //user needs to pick a move getUserChoice()
        //prompt user for a move
    let userMove = "";
    do {
        //checks against plays array entry to ensure the choices match. 
        userMove = prompt(PLAYS[0] + ", " + PLAYS[1] + " or " + PLAYS[2] + "?").toLowerCase().trim();
    }        //case insensitive support.map
    while (userMove !== playsLower[0] && userMove !== playsLower[1] && userMove !== playsLower[2]);
    
    return userMove;
}

function isTie(player1Move, player2Move) {
    if (player1Move === player2Move) {
        return true;
    } else {
        return false;
    }
}

function isWinner(winnerPlayerMove, loserPlayerMove) {
    /* Winning combos:
    (paper, rock) (scissors, paper),(rock, scissors) */
    const winningCombos = [["paper", "rock"], ["scissors", "paper"],["rock", "scissors"]]
    let comboCheck = 0;
    while (comboCheck < 3) { //loops over for the length of the winning combo array to check the winning combos
        if (winnerPlayerMove === winningCombos[comboCheck][0] && loserPlayerMove === winningCombos[comboCheck][1]) {
            return true; //if winner
        }
        comboCheck++;
    }
    return false; //if not a winner
}

    //user vs computer move evaluation
function playRound(player1Move, player2Move) {
    //check for a tie
    if (isTie(player1Move, player2Move)) {
        return "TIE";
    } if (isWinner(player1Move, player2Move)) {
        return PLAYER1;
    } if (isWinner(player2Move, player1Move)) {
        return PLAYER2;
    } else {
        return "Ruhroh! Something unexpected happened!!"
    }
}

function game() {
    let player1Scores = 0;
    let player2Scores = 0;
    let gameCount = 1;
    let gameWinner = "";
    let numberOfRounds = 50;

    while (gameCount <= numberOfRounds) {
        let p1Move = getComputerChoice();
        let p2Move = getUserChoice();
        let gamePlay = playRound(p1Move, p2Move);
        if (gamePlay === PLAYER1) {
            player1Scores++;
            console.log("Bummer! " + PLAYER1 + " was the winner of round " + gameCount + "!");
        } else if (gamePlay === PLAYER2) {
            player2Scores++
            console.log("Congrats! " + PLAYER2 + " was the winner of round " + gameCount + "!");
        } else if (gamePlay === "TIE") {
            console.log("You tried! That round was a tie and there were no winners.");
        } else {
            console.log(gamePlay + "else?");
        }
        alert("That was round " + gameCount + "/" + numberOfRounds);
        gameCount++
    }
    let gameMessage = "\nThanks for playing!";
    let div = "\n-------Overall Scores-------\n\n";


    if (player1Scores > player2Scores) {
        gameWinner = "\n" + PLAYER1 + " Was the overall winner! \n" + gameMessage + "\n" + div + PLAYER1 + 
        " had a final score of: " + player1Scores + ".\n\n" + PLAYER2 + " had a final score of: " + player2Scores + ".\n\n";
    } if (player2Scores > player1Scores){
        gameWinner = "\n" + PLAYER2 + " Was the overall winner! \n" + gameMessage + "\n"+ div + PLAYER2 + 
        " had a final score of: " + player2Scores + ".\n\n" + PLAYER1 + " had a final score of: " + player1Scores + ".\n\n";
    } if (player2Scores === player1Scores) {
        gameWinner = "\n" + "All of the games ended in a tie! \n" + gameMessage + "\n" + div + PLAYER1 + 
        " had a final score of: " + player1Scores + ".\n\n" + PLAYER2 + " had a final score of: " + player2Scores + ".\n\n";
    }
  
return gameWinner;
}
let gamePlay = game();
console.log(gamePlay);


    
//game function is created: 
    //plays five rounds of rock paper scissors, keeps track of the win/losses.
    //for five times
        //play round is called
            //return winner of the round.
            //update score chart

//function to create: getComputerChoice
//randomly picks rock, paper, or scissors


