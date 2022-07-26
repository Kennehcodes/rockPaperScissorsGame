const gameElmnts = { round: 0, winningScore: 10};
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
    const playerOne = {score: 0};
    const playerTwo = {score: 0, username: "Computer"};

    let checkforInput = document.addEventListener("submit", function (e) {
        e.preventDefault();
       let unHolder = String(userInputField.value.toLowerCase());
       let firstUserNameLetter = unHolder[0].toUpperCase();    
       let unCheck = unHolder.replace(unHolder[0], firstUserNameLetter);
       if (unCheck.length > 15) { 
        unCheck = unCheck.slice(0, 15);
       } 
       playerOne.username = unCheck;
       userInputField.value = "";
       userTextField.remove();
       let welcomeContainer = document.createElement("div");
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
        welcomeContainer.appendChild(welcomeText1);
       welcomeContainer.appendChild(welcomeText2);
       userInteractionDiv.appendChild(welcomeContainer);
       gameElmnts.welcomeContainer = welcomeContainer;
       setTimeout(() => {
        gameElmnts.button = document.createElement("button");
        gameElmnts.button.classList.add("startButton");
        gameElmnts.button.textContent = "START!!";
       welcomeContainer.appendChild(gameElmnts.button);
       }, "1000")
     userInteractionDiv.append();
       
    
    })
    
   let meet=   document.querySelector(".startbutton");


    let startButtonIsThereCheck = userInteractionDiv.addEventListener("click", function (event) {
        let startB = event.target; 
        if (startB.tagName === "BUTTON" && startB.classList.contains("startButton"))
        {
            gameElmnts.welcomeContainer.remove();
            rpsContainer.classList.remove("hidden");
            rpsContainer.classList.add("rpsStart");
            buttonPaper.classList.add("paperStart");
            buttonScissors.classList.add("scissorsStart");
            buttonRock.classList.add("rockStart");
            gameElmnts.scoreAndRoundContainer = document.createElement("div");
            gameElmnts.scoreAndRoundContainer.classList.add("flex", "cent");
            gameElmnts.gameScoreBox = document.createElement("span");
            gameElmnts.scoreBoxWelText = document.createElement("span");
            
            gameElmnts.scoreBoxUserContainer= document.createElement("div");
            gameElmnts.scoreBoxUserContainerP1= document.createElement("span");
            gameElmnts.scoreBoxUserContainerP2 = document.createElement("span");
            gameElmnts.scoreBoxUNamesP1 = document.createElement("span");
            gameElmnts.scoreBoxScoreP1 = document.createElement("div");
            gameElmnts.scoreBoxUNamesP2 = document.createElement("span");
            gameElmnts.scoreBoxScoreP2 = document.createElement("div");
            gameElmnts.roundBox = document.createElement("span");
            gameElmnts.roundBoxDynamic = document.createElement("span");
            
            gameElmnts.scoreBoxUserContainer.classList.add("flex", "spaceBt");
          
            gameElmnts.scoreBoxUNamesP2.textContent = playerTwo.username;
            gameElmnts.scoreBoxUNamesP1.classList.add("playerOne");
            gameElmnts.scoreBoxUNamesP2.classList.add("playerTwo");
            gameElmnts.scoreBoxUNamesP1.textContent = playerOne.username;
            gameElmnts.scoreBoxScoreP1.textContent = playerOne.score;
            gameElmnts.scoreBoxScoreP2.textContent = playerTwo.score;
            gameElmnts.roundBox.textContent = "Round ";
            gameElmnts.roundBoxDynamic.textContent = gameElmnts.round;
            
            
            gameElmnts.scoreBoxUserContainerP1.appendChild(gameElmnts.scoreBoxUNamesP1);
            gameElmnts.scoreBoxUserContainerP1.appendChild(gameElmnts.scoreBoxScoreP1);
            
            gameElmnts.scoreBoxUserContainerP2.appendChild(gameElmnts.scoreBoxUNamesP2);
            gameElmnts.scoreBoxUserContainerP2.appendChild(gameElmnts.scoreBoxScoreP2);
            
            
            gameElmnts.scoreBoxUserContainer.appendChild(gameElmnts.scoreBoxUserContainerP1);
            
            gameElmnts.scoreBoxUserContainer.appendChild(gameElmnts.scoreBoxUserContainerP2);
            
            
            
            gameElmnts.gameScoreBox.appendChild(gameElmnts.scoreBoxUserContainer);
            gameElmnts.roundBox.appendChild(gameElmnts.roundBoxDynamic);
            gameElmnts.scoreAndRoundContainer.appendChild(gameElmnts.roundBox);
            

            userInteractionDiv.appendChild(gameElmnts.scoreAndRoundContainer); 
            userInteractionDiv.appendChild(gameElmnts.gameScoreBox);
            
        }
    })

const PLAYS = ["Rock", "Paper", "Scissors"];
const playsLower = PLAYS.map(e => {return e.toLowerCase();})
function getComputerChoice() {
    let randomMove = (Math.floor(Math.random()*playsLower.length + 1)) - (1);  //final negative one accounts for array index
    return playsLower[randomMove];
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




const maxRounds = 10;
let rockCK = document.querySelector("#rock");
rockCK.classList.add("rockStart");
let paperCK = document.querySelector("#paper");
paperCK.classList.add("paperStart");
let scissorsCK = document.querySelector("#scissors");
scissorsCK.classList.add("scissorsStart");

function gamePlay(event){
playerOne.currentMove = event.target.id; 
console.log(playerOne.currentMove)
playerTwo.currentMove = getComputerChoice();
console.log(playerTwo.currentMove);
//update round counter 
gameElmnts.round++;
gameElmnts.roundBoxDynamic.innerText = gameElmnts.round;
let tieCheck = isTie(playerOne.currentMove, playerTwo.currentMove);
console.log(tieCheck)
playerOne.isRoundWinner = isWinner(playerOne.currentMove, playerTwo.currentMove); 
playerTwo.isRoundWinner = isWinner(playerTwo.currentMove, playerOne.currentMove);
console.log("p1 winner?" + playerOne.isRoundWinner);
console.log("p2 winner?" + playerTwo.isRoundWinner);
if (playerOne.isRoundWinner) {
    playerOne.score++;
    gameElmnts.scoreBoxScoreP1.innerText = playerOne.score;
} else if (playerTwo.isRoundWinner) {
    playerTwo.score++;
    gameElmnts.scoreBoxScoreP2.innerText = playerTwo.score;
}}
 //check if max round have been met-> 
            //IF MAX ROUNDS has been met: if so, delete and add a new reset button

       //we need to do two things->
       //record the move
            //update the onclick css color
            //add other effects? sound?
       //get the computer's move
            //update the onclick css color
       //evaluate the win
       //flash the result? maybe?
        //sound?

       //update the score board
function restartGame() {
    gameElmnts.scoreAndRoundContainer.remove(); 
    gameElmnts.gameScoreBox.remove();
    console.log("mooples")
}


let rockClicked = rockCK.addEventListener("click", function (event) {
    let roundStart = event.target; 
    if (roundStart.tagName === "IMG" && roundStart.classList.contains("rockStart"))
    {
        if (playerOne.score >= gameElmnts.winningScore || playerTwo.score >= gameElmnts.winningScore) {
            console.log("done you can't play anymore");
            rpsContainer.classList.add("hidden");
            restartGame();
            

        } else {
            gamePlay(event);
    } 
    }
})
let paperClicked = paperCK.addEventListener("click", function (event) {
    let roundStart = event.target; 
    if (roundStart.tagName === "IMG" && roundStart.classList.contains("paperStart"))
    {
        if (playerOne.score >= gameElmnts.winningScore || playerTwo.score >= gameElmnts.winningScore) {
            console.log("done you can't play anymore")
            rpsContainer.classList.add("hidden");
            restartGame();
        } else {
            gamePlay(event);
    } 
    }
})
let scissorsClicked = scissorsCK.addEventListener("click", function (event) {
    let roundStart = event.target; 
    if (roundStart.tagName === "IMG" && roundStart.classList.contains("scissorsStart"))
    {
        if (playerOne.score >= gameElmnts.winningScore || playerTwo.score >= gameElmnts.winningScore)  {
            console.log("done you can't play anymore")
            rpsContainer.classList.add("hidden");
            restartGame();
        } else {
            gamePlay(event);
    } 
    }
})






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

