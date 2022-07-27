//****-----------VARIABLES----------------------****
//----------(Constants)
const gameElmnts = { round: 0, winningScore: 10 };
//lets find the query selector elements
//first my goal is to include hover functionality
const sounds = {rock: new Audio("/sounds/rock.wav"), paper: new Audio("/sounds/paper.wav"), scissors: new Audio("/sounds/scissors.wav")};
const rock = {};
const paper = {};
const scissors = {};
const playerOne = { score: 0 };
const playerTwo = { score: 0, username: "Computer" };
const UI = {};

const PLAYS = ["Rock", "Paper", "Scissors"];
const playsLower = PLAYS.map((e) => {
    return e.toLowerCase();
});

//---vars and lets


//-----------(query selectors)
UI.uiDiv = document.querySelector("#nameBox");
UI.rPSC = document.querySelector("#rpsc");
rock.h1 = document.querySelector("#h1Rock");
paper.h1 = document.querySelector("#h1Paper");
scissors.h1 = document.querySelector("#h1Scissors");
rock.button = document.querySelector("#buttonRock");
paper.button = document.querySelector("#buttonPaper");
scissors.button = document.querySelector("#buttonScissors");
rock.img = document.querySelector("#rock");
paper.img = document.querySelector("#paper");
scissors.img = document.querySelector("#scissors");


//****------------FUNCTIONS/METHODS------****

function addColor(nameOfObject) {
    nameOfObject.h1.classList.add("color");
}
function removeColor(nameOfObject) {
    nameOfObject.h1.classList.remove("color")
}

function addColorP2(nameOfObject) {
    nameOfObject.h1.classList.add("p2");
}
function removeColorP2(nameOfObject) {
    nameOfObject.h1.classList.remove("p2");
}


function getUserName() {
    UI.namePromptContainer = document.createElement("div");
    UI.namePromptForm = document.createElement("form");
    UI.nameInput = document.createElement("input");
    UI.nameSubmit = document.createElement("button");
    UI.namePromptContainer.classList.add("center");
    UI.uiDiv.classList.add("subtext");
    UI.namePromptContainer.textContent = "Enter your name to start:";
    UI.nameInput.placeholder = "What's your name?";
    UI.nameSubmit.textContent = "enter";
    UI.nameSubmit.type = "submit";
    UI.namePromptContainer.classList.add("center");
    UI.nameInput.classList.add("paddingTop");
    UI.namePromptForm.appendChild(UI.nameInput);
    UI.namePromptForm.appendChild(UI.nameSubmit);
    UI.namePromptContainer.appendChild(UI.namePromptForm);
    UI.uiDiv.appendChild(UI.namePromptContainer);
}

function gotUserNameStart(e) {

    e.preventDefault();
    let unHolder = String(UI.nameInput.value.toLowerCase());
    let firstUserNameLetter = unHolder[0].toUpperCase();
    let unCheck = unHolder.replace(unHolder[0], firstUserNameLetter);
    if (unCheck.length > 15) {
        unCheck = unCheck.slice(0, 15);
    }
    playerOne.username = unCheck;
    UI.nameInput.value = "";
    UI.namePromptContainer.remove();
    let welcomeContainer = document.createElement("div");
    let welcomeText1 = document.createElement("h2");
    let welcomeText2 = document.createElement("p");
    let welcomeUser = document.createElement("span");
    let endWelcomeText1 = document.createElement("span");
    welcomeText1.textContent = "Welcome ";
    welcomeUser.textContent = playerOne.username;
    endWelcomeText1.textContent = "!";
    welcomeText2.textContent =
        "Are you ready to play Rock Paper Scissors with the " +
        playerTwo.username +
        "?";
    welcomeUser.classList.add("username");

    welcomeText1.appendChild(welcomeUser);
    welcomeText1.appendChild(endWelcomeText1);
    welcomeContainer.appendChild(welcomeText1);
    welcomeContainer.appendChild(welcomeText2);
    UI.uiDiv.appendChild(welcomeContainer);
    gameElmnts.welcomeContainer = welcomeContainer;
    setTimeout(() => {
        gameElmnts.button = document.createElement("button");
        gameElmnts.button.classList.add("startButton");
        gameElmnts.button.textContent = "START!!";
        welcomeContainer.appendChild(gameElmnts.button);
    }, "1000");
    UI.uiDiv.append();
}

function isThereAStartButton(event) {
    let startB = event.target;
    if (
        startB.tagName === "BUTTON" &&
        startB.classList.contains("startButton")
    ) {
       startGameUI();
}

}

function clearScoreAndPlayerBox() {
    UI.scoreFlexContainer.remove();
    UI.playersFlexContainer.remove();
}
function clearWelcomeContainer() { //deletes the welcome box from the dom
    gameElmnts.welcomeContainer.remove();
}

function showRockPaperScissorsIcons() { //to show rps box
    UI.rPSC.classList.remove("hidden");
}


function hideRockPaperScissorsIcons() { //to hide rps box
    UI.rPSC.classList.add("hidden");
}

function addReadyClass() { //adds ready to start class for logic checking
    UI.rPSC.classList.add("rpsStart");
    paper.img.classList.add("paperStart");
    scissors.img.classList.add("scissorsStart");
    rock.img.classList.add("rockStart");
    
}

function removeReadyClass() { //removes the ready to start class --utilize at end of game
    UI.rPSC.classList.remove("rpsStart");
    paper.button.classList.remove("paperStart");
    scissors.button.classList.remove("scissorsStart");
    rock.button.classList.remove("rockStart");
}
function createScoreAndPlayerBox() {
    //containers for the round info
    UI.scoreFlexContainer = document.createElement("div"); //flex object that contains the round and # for round inside
    UI.scoreFlexContainer.classList.add("flex", "cent");
    UI.rText = document.createElement("span"); //text literally saying round
    UI.rNum = document.createElement("span"); //update to round number

    UI.playersFlexContainer = document.createElement("div");
    //flex container holding player's info

    //player 1 info for scores
    UI.p1Container = document.createElement("span");
    UI.p1SpanForName = document.createElement("span");
    UI.p1DivForScore = document.createElement("div");

    //player 2 info for scores
    UI.p2Container = document.createElement("span");
    UI.p2SpanForName = document.createElement("span");
    UI.p2DivForScore = document.createElement("div");

    //gameScoreBox was deleted
    //scoreboxweltext was deleted

    //addition of classes
    UI.playersFlexContainer.classList.add("flex", "spaceBt");
    UI.p1SpanForName.classList.add("playerOne");
    UI.p2SpanForName.classList.add("playerTwo");

    //addition of textContent
    UI.p1SpanForName.textContent = playerOne.username;
    UI.p1DivForScore.textContent = playerOne.score;
    UI.p2SpanForName.textContent = playerTwo.username;
    UI.p2DivForScore.textContent = playerTwo.score;
    UI.rText.textContent = `Round `;
    UI.rNum.textContent = gameElmnts.round;

    //building the dom and adding the elements

    //round Elements
    UI.scoreFlexContainer.appendChild(UI.rText);
    UI.scoreFlexContainer.appendChild(UI.rNum);

    //P1 elements
    UI.p1Container.appendChild(UI.p1SpanForName);
    UI.p1Container.appendChild(UI.p1DivForScore);
    //p2 elements
    UI.p2Container.appendChild(UI.p2SpanForName);
    UI.p2Container.appendChild(UI.p2DivForScore);
    //player wrapper
    UI.playersFlexContainer.appendChild(UI.p1Container);
    UI.playersFlexContainer.appendChild(UI.p2Container);
    //append to user interaction div
    UI.uiDiv.appendChild(UI.scoreFlexContainer);
    UI.uiDiv.appendChild(UI.playersFlexContainer);
}

function startGameUI() {
    clearWelcomeContainer();
    showRockPaperScissorsIcons();
    addReadyClass();
    createScoreAndPlayerBox();
}
//-------(functions relating to game logic)
function getComputerChoice() { //get's the computers move randomly
    let randomMove = Math.floor(Math.random() * playsLower.length + 1) - 1; //final negative one accounts for array index
    return playsLower[randomMove];
}
function isTie(player1Move, player2Move) { //checks if it's a tied game
    if (player1Move === player2Move) {
        return true;
    } else {
        return false;
    }
}

function isWinner(winnerPlayerMove, loserPlayerMove) { //determines if 1st player is winner
    const winningCombos = [
        ["paper", "rock"],
        ["scissors", "paper"],
        ["rock", "scissors"],
    ];
    let comboCheck = 0;
    while (comboCheck < 3) {
        //loops over for the length of the winning combo array to check the winning combos
        if (
            winnerPlayerMove === winningCombos[comboCheck][0] &&
            loserPlayerMove === winningCombos[comboCheck][1]
        ) {
            return true; //if winner
        }
        comboCheck++;
    }
    return false; //if not a winner
}


function gamePlay(event) {
    playerOne.currentMove = event.target.id; //gets user move
    playerTwo.currentMove = getComputerChoice(); //gets pc move
    setTimeout(delayCompChoice, 1000);
    gameElmnts.round++; //updates game round
    UI.rNum.innerText = gameElmnts.round; //updates round text on DOM
    gameElmnts.isTie = isTie(playerOne.currentMove, playerTwo.currentMove); //checks for a tie  
    
    console.log(gameElmnts.isTie);
    if (gameElmnts.isTie === false) {
        playerOne.isRoundWinner = isWinner( //checks for p1 win returns true or false
        playerOne.currentMove,
        playerTwo.currentMove
    );
    playerTwo.isRoundWinner = isWinner( //checks for p2 win returns true or false
        playerTwo.currentMove,
        playerOne.currentMove
    );
    if (playerOne.isRoundWinner) { //if p1 is round winner the score for p1 is updated
        playerOne.score++;
        UI.p1DivForScore.innerText = playerOne.score;
    } else if (playerTwo.isRoundWinner) { //if p2 is round winner the score for p2 is updated
        playerTwo.score++;
        UI.p2DivForScore.innerText = playerTwo.score;
    } 

    }
        


    console.log("tie space only")
    }
//}
//}

function getMePlayVariable(player) {
    if (player.currentMove === "scissors") {
        return scissors;
    } else if (player.currentMove === "rock") {
        return rock;
    } else  {
        return paper;
    }
}

function ifGameIsOver() { 
    //checks if the winning score has been met, returns true or false
    if (
        playerOne.score >= gameElmnts.winningScore ||
        playerTwo.score >= gameElmnts.winningScore
    ) {
        return true
    } else {
        return false;
    }
}

//****----------EVENT LISTENERS-------****
rock.button.addEventListener("mouseover", () => addColor(rock) ); //following events are for the mouseover color changes
paper.button.addEventListener("mouseover", () => addColor(paper));
scissors.button.addEventListener("mouseover", () => addColor(scissors));
rock.button.addEventListener("mouseout", () => removeColor(rock));
paper.button.addEventListener("mouseout", () => removeColor(paper));
scissors.button.addEventListener("mouseout", () => removeColor(scissors));

let checkForInput = document.addEventListener("submit", function (e) { //runs after username submitted
    gotUserNameStart(e)
});
let startButtonIsThereCheck = UI.uiDiv.addEventListener(
    "click", function (event) {
        isThereAStartButton(event);
    }
);

//****---------Function Calls
getUserName();


///to creates--


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

function delayCompChoice() {
    
function showComputersChoiceAsSideEffects(computersMove) {
    console.log(computersMove);
    let checker = ["paper", "scissors", "rock"]
    for (let i of checker) {
    if (computersMove === i) {
        sounds[i].play();
        console.log(i);
        let x = getMePlayVariable(playerTwo);
        addColorP2(x);

     
    }
}
}
showComputersChoiceAsSideEffects(playerTwo.currentMove)
}




function startNewRound() {
    clearStoredScores();
    clearRounds();
    
}
function clearStoredScores() {
    playerOne.score = 0;
    playerTwo.score = 0;
}

function clearRounds() {
    gameElmnts.round = 0;
}

function changeMaxWinningScore(num) { 
    //allows for functionality if we want to dynamically allow user to pick
    //what score to play to
    gameElmnts.winningScore = num;
}


//lets make
function startGameFlow() {
    getUserName(); //creates username prompts
}

function askIfWantToPlayAgain() {
    console.log("one more time?");
    restartGame();

       
        startNewRound();
        startGameFlow();

}


//update the score board
function restartGame() {
    removeReadyClass(); //removes the ready start class
    clearScoreAndPlayerBox(); //hides scores
    hideRockPaperScissorsIcons(); //hides the icons
}

    //what I want to happen is a overview flash of the winner and round info;
    //maybe keep a log of how many times the computer threw rock vs you?
    //keep a log of how many times the player one threw rock
    //after overview I want to create a reset button to have two options.
    //option one: change username and restart
    //option two: keep playing
    //additional options change game round play until functions
    //in order to accomplish this Ill need to make my code modula
    //-------(for gameplay)
rock.clicked = rock.img.addEventListener("click", function (event) {
    let roundStart = event.target;
    removeP2ColorClasses();
    if (
        roundStart.tagName === "IMG" &&
        roundStart.classList.contains("rockStart")
    ) {
        if (!ifGameIsOver()) {
            sounds.rock.play();
            gamePlay(event);
         } 
         else {
            askIfWantToPlayAgain();
        }
    }}
);
paper.clicked = paper.img.addEventListener("click", function (event) {
    let roundStart = event.target;
    removeP2ColorClasses();
    if (
        roundStart.tagName === "IMG" &&
        roundStart.classList.contains("paperStart")
    ) {
        if (!ifGameIsOver()) {
            sounds.paper.play();
            gamePlay(event);
         } 
         else {
            askIfWantToPlayAgain();
        }
        }
});


scissors.clicked = scissors.img.addEventListener("click", function (event) {
    let roundStart = event.target;
    removeP2ColorClasses();
    if (
        roundStart.tagName === "IMG" &&
        roundStart.classList.contains("scissorsStart")
    ) {
        if (!ifGameIsOver()) {
            sounds.scissors.play();
            gamePlay(event);
         } 
         else {
            askIfWantToPlayAgain();
         }
        }
});


function removeP2ColorClasses(){
 if (rock.h1.classList.contains("p2")){
    rock.h1.classList.remove("p2");
 }  
 if (paper.h1.classList.contains("p2")){
    paper.h1.classList.remove("p2");
 }  
 if (scissors.h1.classList.contains("p2")){
    scissors.h1.classList.remove("p2");
 }   
}