

//****-----------VARIABLES----------------------****
//----------(Constants)
const gameElmnts = { round: 0, winningScore: 3 };
//lets find the query selector elements
//first my goal is to include hover functionality
const sounds = {rock: new Audio("/sounds/rock.wav"), paper: new Audio("/sounds/paper.wav"), 
scissors: new Audio("/sounds/scissors.wav"), win: new Audio("/sounds/win.wav"), 
lose: new Audio("/sounds/lose.wav"), tie: new Audio("/sounds/tie.wav"), 
gameWin: new Audio("/sounds/gamewin.wav"), gameLose: new Audio("/sounds/gamelose.wav")};
//sounds for rock, paper and scissors are by myself Mackenzie Lee
//other sounds are from mixkit.co/free-sound-effect

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


function disableMouseOverOnButtons() {
    rock.button.classList.remove("hoverOnIcon");
    paper.button.classList.remove("hoverOnIcon");
    scissors.button.classList.remove("hoverOnIcon");
}


function removeColorClass(nameOfObject, className) {
    nameOfObject.h1.classList.remove(className)
}


function addColorClass(nameOfObject, className) {
    nameOfObject.h1.classList.add(className);
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
//not needed?
// function addReadyClass() { //adds ready to start class for logic checking
//     UI.rPSC.classList.add("rpsStart");
//     paper.img.classList.add("paperStart");
//     scissors.img.classList.add("scissorsStart");
//     rock.img.classList.add("rockStart");
    
// }

// function removeReadyClass() { //removes the ready to start class --utilize at end of game
//     UI.rPSC.classList.remove("rpsStart");
//     paper.button.classList.remove("paperStart");
//     scissors.button.classList.remove("scissorsStart");
//     rock.button.classList.remove("rockStart");
// }

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
    UI.rText.classList.add("gap");

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
function createUIStatusBar() {
UI.sbDiv = document.createElement("div");
UI.sb1P = document.createElement("p");
UI.sb1P.textContent = "Pick rock, paper or scissors to start!";
UI.sbDiv.classList.add("notifications");
UI.sbDiv.appendChild(UI.sb1P);
UI.mainContent = document.querySelector("#mainContent");
UI.mainContent.insertBefore(UI.sbDiv, UI.rPSC);

}

function createPlayAgainButton() {
    UI.paDiv = document.createElement("div");
    UI.pAbutton = document.createElement("button");
    UI.paDiv.classList.add("paDiv");
    UI.pAbutton.classList.add("pAgainButton");
    UI.pAbutton.textContent = "Play again?";
    UI.paDiv.appendChild(UI.pAbutton);
    UI.mainContent.appendChild(UI.paDiv);
    UI.href = document.location.href;
UI.pAbutton.addEventListener("click", location.href=UI.href);

}
function startGameUI() {
    clearWelcomeContainer();
    showRockPaperScissorsIcons();
    //addReadyClass();
    createUIStatusBar();
    createScoreAndPlayerBox();
}
//-------(functions relating to game logic)

//game gatekeeper functions 
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




//player 2 functions only: 

function getComputerChoice() { //get's the computers move randomly
    let randomMove = Math.floor(Math.random() * playsLower.length + 1) - 1; //final negative one accounts for array index
    return playsLower[randomMove];
}








//game evaluation logic: 

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


//----------------------------------
//functions for side affects 

const updateBox = function (text, seconds) {
    setTimeout(() => {UI.sb1P.innerText = text}, seconds)
}    


///
function gamePlay(event) {

    playerOne.currentMove = event.target.id; //gets user move
    UI.rPSC.removeEventListener('click', checkForValidGame);

    //disables hover effect during round
     disableMouseOverOnButtons();
    
    

    //updates game round
    gameElmnts.round++;

     //updates round text on DOM
    UI.rNum.innerText = gameElmnts.round;
    showingMoveForPlayer(playerOne.currentMove, "p1");
    
    //updates plays on the play-by-play box on the dom
    updateBox(`${playerOne.username} plays ${playerOne.currentMove}.`, 400)
    playerTwo.currentMove = getComputerChoice(); //gets pc move
    updateBox(`${playerTwo.username} plays ${playerTwo.currentMove}.`, 2200) //shows pc move
    
    gameElmnts.isTie = isTie(playerOne.currentMove, playerTwo.currentMove); //checks for a tie  
    if(gameElmnts.isTie === true) {
        showMovesForTie(playerTwo.currentMove) //shows p2 move
        console.log("tie")
    } else {
        showingMoveForPlayer(playerTwo.currentMove, "p2");
        console.log("not a tie")    } 
    if (gameElmnts.isTie === false) {
        playerOne.isRoundWinner = isWinner( //checks for p1 win returns true or false
        playerOne.currentMove,
        playerTwo.currentMove);
        playerTwo.isRoundWinner = isWinner( //checks for p2 win returns true or false
        playerTwo.currentMove,
        playerOne.currentMove);

        if (playerOne.isRoundWinner === true) { //if p1 is round winner the score for p1 is updated
            //updates player score on dom

            playerOne.score++;
            UI.p1DivForScore.innerText = playerOne.score;  
         
            setTimeout(() => { sounds.win.play();
            }, 4000)
            
            updateBox(`${playerOne.username} played ${playerOne.currentMove} and ${playerTwo.username} played ${playerTwo.currentMove}. \n You win!!`, 4000)
            
            
        } else if (playerTwo.isRoundWinner === true) { //if p2 is round winner the score for p2 is updated
            //updates player score on the dom

            playerTwo.score++;
            UI.p2DivForScore.innerText = playerTwo.score;
            
            setTimeout(() => { sounds.lose.play();
            }, 4000)
            
            updateBox(`${playerTwo.username} played ${playerTwo.currentMove} and ${playerOne.username} played ${playerOne.currentMove}. \n You lost.`, 4000)
                    } 

    } else {
    
    console.log("tie space only") 

    setTimeout(() => { sounds.tie.play();
    }, 4000)

    updateBox(`${playerOne.username} and ${playerTwo.username} played ${playerOne.currentMove}. \n It's a tie!`, 4000)
    
    }

    setTimeout( ()=> {
        removeColorClass(rock, "p1");
        removeColorClass(rock, "p2");
        removeColorClass(rock, "tie");
        removeColorClass(paper, "p1");
        removeColorClass(paper, "p2");
        removeColorClass(paper, "tie");
        removeColorClass(scissors, "p1");
        removeColorClass(scissors, "p2");
        removeColorClass(scissors, "tie");
        UI.gameHandler = UI.rPSC.addEventListener("click", checkForValidGame) 
        rock.button.classList.add("hoverOnIcon");
        paper.button.classList.add("hoverOnIcon");
        scissors.button.classList.add("hoverOnIcon");
        console.log("test")
    },
     5000)


     if(playerOne.score === gameElmnts.winningScore || playerTwo.score === gameElmnts.winningScore) {
        //deletes event handler if max score has been reached before the event is clicked again.
        disableMouseOverOnButtons();
        UI.rPSC.removeEventListener('click', checkForValidGame);
        
      
    }
    }
//}
//}


function showingMoveForPlayer(move, playerClass) {
    if (move === "rock") {
        addColorClass(rock, playerClass);
        sounds[move].play();
    } else if (move === "paper") {
        addColorClass(paper, playerClass);
        sounds[move].play();
    } else {
        addColorClass(scissors, playerClass);
        sounds[move].play();
    }
}

function showMovesForTie(move) {
    if (move === "rock") {
        removeColorClass(rock, "p1")
        addColorClass(rock, "tie");
        sounds[move].play();
    } else if (move === "paper") {
        removeColorClass(paper, "p1")
        addColorClass(paper, "tie");
        sounds[move].play();
    } else {
        removeColorClass(scissors, "p1")
        addColorClass(scissors, "tie");
        sounds[move].play();
    }
}



function endGameSummary(){
    UI.sb1P.innerText = `${playerOne.username} Thanks for playing!\n your final
    score was ${playerOne.score}`;
    
}
//-------more functions
// function removeP1ColorClasses(){
//     if (rock.h1.classList.contains("p1")){
//        rock.h1.classList.remove("p1");
//     }  
//     if (paper.h1.classList.contains("p1")){
//        paper.h1.classList.remove("p1");
//     }  
//     if (scissors.h1.classList.contains("p1")){
//        scissors.h1.classList.remove("p1");
//     }   
//    }
// function removeColorClasses(className){
//     let a = [rock, paper, scissors];
    
//     for (let b of a) {
//         if (b.h1.classList.container(className)){
//             b.h1.classList.remove(className);
//         }
//     }
//test for workage:
    // if (rock.h1.classList.contains("p2")){
    //    rock.h1.classList.remove("p2");
    // }  
    // if (paper.h1.classList.contains("p2")){
    //    paper.h1.classList.remove("p2");
    // }  
    // if (scissors.h1.classList.contains("p2")){
    //    scissors.h1.classList.remove("p2");
    // }   
//}





// function delayCompChoice() {
    
//     function showComputersChoiceAsSideEffects(computersMove) {
//         console.log(computersMove);
//         let checker = ["paper", "scissors", "rock"]
//         for (let i of checker) {
//         if (computersMove === i) {
//             sounds[i].play();
//             let x = getMePlayVariable(playerTwo);
//             //addColorP2(x);   
//         }
//     }
//     }
//     showComputersChoiceAsSideEffects(playerTwo.currentMove)
// }


function clearOldRoundData() {
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


//hidesanddeletes rps ui
function delGame() {
    removeReadyClass(); //removes the ready start class
    clearScoreAndPlayerBox(); //hides scores
    hideRockPaperScissorsIcons(); //hides the icons
}
//****----------EVENT LISTENERS-------****

rock.button.addEventListener("mouseover", () => addColorClass(rock, "rpsH1Hover") ); //following events are for the mouseover color changes
paper.button.addEventListener("mouseover", () => addColorClass(paper, "rpsH1Hover"));
scissors.button.addEventListener("mouseover", () => addColorClass(scissors, "rpsH1Hover"));
rock.button.addEventListener("mouseout", () => removeColorClass(rock, "rpsH1Hover"));
paper.button.addEventListener("mouseout", () => removeColorClass(paper,"rpsH1Hover"));
scissors.button.addEventListener("mouseout", () => removeColorClass(scissors, "rpsH1Hover"));

let checkForInput = document.addEventListener("submit", function (e) { //runs after username submitted
//implement error checking :()
    gotUserNameStart(e)
});


let startButtonIsThereCheck = UI.uiDiv.addEventListener(
    "click", function (event) {
        isThereAStartButton(event);
    }
);

//****---------Function Calls
getUserName();

function askIfWantToPlayAgain() {
    console.log("one more time?");
    let waitBeforeDeletion = setTimeout(clearGame, 3000);
   
}

function clearGame(){
    delGame();
    clearOldRoundData();
    setTimeout(endGameSummary, 2000);
    createPlayAgainButton();
}
///to creates--
//flash the result? maybe?
//sound?
    //what I want to happen is a overview flash of the winner and round info;
    //maybe keep a log of how many times the computer threw rock vs you?
    //keep a log of how many times the player one threw rock
    //after overview I want to create a reset button to have two options.
    //option one: change username and restart
    //option two: keep playing
    //additional options change game round play until functions
    //in order to accomplish this Ill need to make my code modula
    //-------(for gameplay)









function changeMaxWinningScore(num) { 
    //allows for functionality if we want to dynamically allow user to pick
    //what score to play to
    gameElmnts.winningScore = num;
}


//lets make



// rock.clicked = rock.img.addEventListener("click", function (event) {
//     let roundStart = event.target;
//     removeColorClasses("p1");
//     removeColorClasses("p2");
//     addColorP1(rock);
//     if (
//         roundStart.tagName === "IMG" &&
//         roundStart.classList.contains("rockStart")
//     ) {
//         if (!ifGameIsOver()) {
//             sounds.rock.play();
//             gamePlay(event);
//             if (playerOne.score === gameElmnts.winningScore || playerTwo.score === gameElmnts.winningScore)  {
//                 clearGame();
//             }
//          } 
//          else {
//             askIfWantToPlayAgain();
//         }
//     }}
// );
// paper.clicked = paper.img.addEventListener("click", function (event) {
//     let roundStart = event.target;
//     removeColorClasses("p1");
//     removeColorClasses("p2");
//     addColorP1(paper);
//     if (
//         roundStart.tagName === "IMG" &&
//         roundStart.classList.contains("paperStart")
//     ) {
//         if (!ifGameIsOver()) {
//             sounds.paper.play();
//             gamePlay(event);
//             if (playerOne.score === gameElmnts.winningScore || playerTwo.score === gameElmnts.winningScore)  {
//                 clearGame();
//             }
//          } 
//          else {
//             askIfWantToPlayAgain();
//         }
//         }
// });


// scissors.clicked = scissors.img.addEventListener("click", function (event) {
//     let roundStart = event.target;
//     removeColorClasses("p1");
//     removeColorClasses("p2");
//     addColorP1(scissors);
//     if (
//         roundStart.tagName === "IMG" &&
//         roundStart.classList.contains("scissorsStart")
//     ) {
//         if (!ifGameIsOver()) {
//             sounds.scissors.play();
//             gamePlay(event);
//             if (playerOne.score === gameElmnts.winningScore || playerTwo.score === gameElmnts.winningScore)  {
//                 clearGame();
//             }
//          } 
//          else {
//             askIfWantToPlayAgain();
//          }
//         }
// });

function checkForValidGame(e) {
    
    if (playerOne.score >= gameElmnts.winningScore || playerTwo.score >= gameElmnts.winningScore) {
        //remove event handler
        //toggle css class to remove hover effects, or reflect fact that game ended
        UI.rPSC.removeEventListener('click', checkForValidGame);
        
        console.log("event handler was deleted. wow!")
        //disables hover effect during round
        disableMouseOverOnButtons();
    
        
    } else {
     //game is still in play
        
        if (e.target === rock.img || e.target === paper.img || e.target === scissors.img) {
                console.log("valid move");
            gamePlay(e);
          

        } else {
            console.log("not a move");
        }
    }
}


//sounds.paper.play();
//             gamePlay(event);
//             if (playerOne.score === gameElmnts.winningScore || playerTwo.score === gameElmnts.winningScore)  {
//                 clearGame();
//             }
//          } 
//          else {
//             askIfWantToPlayAgain();
//         }


UI.gameHandler = UI.rPSC.addEventListener("click", checkForValidGame);






