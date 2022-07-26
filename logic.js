
//lets find the query selector elements
//first my goal is to include hover functionality 

const h1Rock = document.querySelector("#h1Rock");
const h1Paper = document.querySelector("#h1Paper");
const h1Scissors = document.querySelector("#h1Scissors");

const buttonRock = document.querySelector("#buttonRock");
const buttonPaper = document.querySelector("#buttonPaper");
const buttonScissors = document.querySelector("#buttonScissors");

console.log(buttonScissors);

buttonRock.addEventListener('mouseover', () => h1Rock.classList.add("color"));
buttonPaper.addEventListener('mouseover', () => h1Paper.classList.add("color"));
buttonScissors.addEventListener('mouseover', () => h1Scissors.classList.add("color"));
buttonRock.addEventListener('mouseout', () => h1Rock.classList.remove("color"));
buttonPaper.addEventListener('mouseout', () => h1Paper.classList.remove("color"));
buttonScissors.addEventListener('mouseout', () => h1Scissors.classList.remove("color"));


    const rpsContainer = document.querySelector("#rpsc");
    rpsContainer.classList.add("hidden");
    const userInteractionDiv = document.querySelector('#nameBox');
    let userTextField = document.createElement("div");
    let userInputForm = document.createElement("form");
    let userInputField = document.createElement("input");
    let userInputSubmit = document.createElement("button");
    userTextField.classList.add("center");
    userInteractionDiv.classList.add("subtext")
;    userTextField.textContent = "Enter your name to start\:";
    userInputField.placeholder = "What's your name?";
    userInputSubmit.textContent = "enter";
    userInputSubmit.type = "submit";
    userTextField.classList.add("center");
    userInputField.classList.add("paddingTop");
    userInputForm.appendChild(userInputField);
    userInputForm.appendChild(userInputSubmit);
    userTextField.appendChild(userInputForm);
    userInteractionDiv.appendChild(userTextField);
    const playerOne = {};
    const playerTwo = {username: "Computer"};

    let checkforInput = document.addEventListener("submit", function (e) {
        e.preventDefault();
       let unHolder = String(userInputField.value.toLowerCase());
       let firstUserNameLetter = unHolder[0].toUpperCase();    
       playerOne.username = unHolder.replace(unHolder[0], firstUserNameLetter);
       
       userInputField.value = "";
       userTextField.remove();
       let welcomeText1 = document.createElement("h2");
       let welcomeText2 = document.createElement("p");
       let welcomeUser = document.createElement("span");
       let endWelcomeText1 = document.createElement("span"); 
       welcomeText1.textContent = "Welcome ";
        welcomeUser.textContent = playerOne.username;
        endWelcomeText1.textContent = "!";
        welcomeText2.textContent ="Are you ready to play Rock Paper Scissors with the "+ playerTwo.username + "?"; 
       welcomeUser.classList.add("username");

       welcomeText1.appendChild(welcomeUser);
       welcomeText1.appendChild(endWelcomeText1);
        userInteractionDiv.appendChild(welcomeText1);
       userInteractionDiv.appendChild(welcomeText2);

    })
    
        

//logic for rock paper scissors implementation
    //additional fun flare: create two user names for each player.

//Error checking to ensure that the username is not empty or too long.

//uncommentconsole.log("Welcome " + PLAYER2 +"! \n\nAre you ready to play Rock Paper Scissors with the " + PLAYER1 + "?");

const PLAYS = ["Rock", "Paper", "Scissors"];
const playsLower = PLAYS.map(e => {return e.toLowerCase();})

function getComputerChoice() {
    let randomMove = (Math.floor(Math.random()*playsLower.length + 1)) - (1);  //final negative one accounts for array index
    return playsLower[randomMove];
}

function getUserChoice() {
    let userMove = "";
    do {
        userMove = prompt(PLAYS[0] + ", " + PLAYS[1] + " or " + PLAYS[2] + "?").toLowerCase().trim();
    }    
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
    let numberOfRounds = 0;

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
//let gamePlay = game();

//uncomment thiss console.log(gamePlay);

    
//game function is created: 
    //plays five rounds of rock paper scissors, keeps track of the win/losses.
    //for five times
        //play round is called
            //return winner of the round.
            //update score chart


//function to create: getComputerChoice
//randomly picks rock, paper, or scissors

