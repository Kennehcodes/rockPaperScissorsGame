//Credits
//sounds for rock, paper and scissors were recorded by myself Mackenzie Lee
//other sounds are from mixkit.co/free-sound-effect
//all illustrations were done myself, Mackenzie Lee github: KennehCodes

//****-----------VARIABLES----------------------****
//----------(Constants)
const gameElmnts = { round: 0, winningScore: 5 };

const sounds = {
  rock: new Audio("rock.wav"),
  paper: new Audio("paper.wav"),
  scissors: new Audio("scissors.wav"),
  win: new Audio("win.wav"),
  lose: new Audio("lose.wav"),
  tie: new Audio("tie.wav"),
  gameWin: new Audio("gamewin.wav"),
  gameLose: new Audio("gamelose.wav"),
};

const gameStats = {
  nTimesP1ThrewRock: 0,
  nTimesP2ThrewRock: 0,
  nTimesP1ThrewPaper: 0,
  nTimesP2ThrewPaper: 0,
  nTimesP1ThrewScissors: 0,
  nTimesP2ThrewScissors: 0,
  nTimesTie: 0,
};

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

//-----------(query selectors)

UI.body = document.querySelector("body");
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

// -- dom related
//creating elements

//creating username input box
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
  UI.namePromptForm.classList.add("form");
  UI.nameSubmit.classList.add("nameInputButton");
  UI.namePromptContainer.classList.add("formDiv");
  UI.nameInput.classList.add("paddingTop");
  UI.namePromptForm.appendChild(UI.nameInput);
  UI.namePromptForm.appendChild(UI.nameSubmit);
  UI.namePromptContainer.appendChild(UI.namePromptForm);
  UI.uiDiv.appendChild(UI.namePromptContainer);
}

//checking username and creating ready screen
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

function createScoreAndPlayerBox() {
  //containers for the round info
  UI.scoreFlexContainer = document.createElement("div"); //flex object that contains the round and # for round inside
  UI.scoreFlexContainer.classList.add("flex", "cent");
  UI.rText = document.createElement("span"); //text literally saying round
  UI.rNum = document.createElement("span"); //update to round number

  //flex container holding player's info
  UI.playersFlexContainer = document.createElement("div");

  //player 1 info for scores
  UI.p1Container = document.createElement("span");
  UI.p1SpanForName = document.createElement("span");
  UI.p1DivForScore = document.createElement("div");

  //player 2 info for scores
  UI.p2Container = document.createElement("span");
  UI.p2SpanForName = document.createElement("span");
  UI.p2DivForScore = document.createElement("div");

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

//deals with the ui bar that flashed messages during the game
function createUIStatusBar() {
  UI.sbDiv = document.createElement("div");
  UI.sb1P = document.createElement("p");
  UI.sb1P.textContent = "Pick rock, paper or scissors to start!";
  UI.sbDiv.classList.add("notifications");
  UI.sbDiv.appendChild(UI.sb1P);
  UI.mainContent = document.querySelector("#mainContent");
  UI.mainContent.insertBefore(UI.sbDiv, UI.uiDiv);
}

//needs to be looked at---
function createPlayAgainButton() {
  UI.paDiv = document.createElement("div");
  UI.pAbutton = document.createElement("button");
  UI.paDiv.classList.add("paDiv");
  UI.pAbutton.classList.add("pAgainButton");
  UI.pAbutton.textContent = "Play again?";
  UI.paDiv.appendChild(UI.pAbutton);
  UI.mainContent.appendChild(UI.paDiv);
  UI.href = document.location.href;
  UI.pAbutton.addEventListener("click", () => {
    resetStats();
    clearRounds();
    clearStoredScores();

    //delete stull
    UI.gameOverviewContainer.remove();
    UI.paDiv.remove();

    //start game again.
    getUserName();
  });
}

//allows for easy text changing to the dom where the user game play by play is flashed
const updateBox = function (text, seconds) {
  setTimeout(() => {
    UI.sb1P.innerText = text;
  }, seconds);
};

//deletion for dom elements

//deletes the score box
function clearScoreAndPlayerBox() {
  UI.scoreFlexContainer.remove();
  UI.playersFlexContainer.remove();
}

//deletes the welcome box from the dom
function clearWelcomeContainer() {
  gameElmnts.welcomeContainer.remove();
}

//controlling visibility of dom elements

//hiding
function disableMouseOverOnButtons() {
  rock.button.classList.remove("hoverOnIcon");
  paper.button.classList.remove("hoverOnIcon");
  scissors.button.classList.remove("hoverOnIcon");
}

function removeColorClass(nameOfObject, className) {
  nameOfObject.h1.classList.remove(className);
}

//to hide rps box
function hideRockPaperScissorsIcons() {
  UI.rPSC.classList.add("hidden");
}

//showing

//shows the moves on the h1 text for each player and plays a sound to reflect their chosen game move
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

//if the round is a tie, reflects the h1 text and sounds.
function showMovesForTie(move) {
  if (move === "rock") {
    removeColorClass(rock, "p1");
    addColorClass(rock, "tie");
    sounds[move].play();
  } else if (move === "paper") {
    removeColorClass(paper, "p1");
    addColorClass(paper, "tie");
    sounds[move].play();
  } else {
    removeColorClass(scissors, "p1");
    addColorClass(scissors, "tie");
    sounds[move].play();
  }
}

//adds classes to h1 to change style
function addColorClass(nameOfObject, className) {
  nameOfObject.h1.classList.add(className);
}

//to show rps box
function showRockPaperScissorsIcons() {
  UI.rPSC.classList.remove("hidden");
  UI.gameHandler = UI.rPSC.addEventListener(
    "click",
    ifClickIsAValidPlayStartGame
  );
}

//logic checking for dom elements

//checks for the start button
function isThereAStartButton(event) {
  let startB = event.target;
  if (startB.tagName === "BUTTON" && startB.classList.contains("startButton")) {
    startGameUI();
  }
}

//?
function startGameUI() {
  clearWelcomeContainer();
  showRockPaperScissorsIcons();
  createUIStatusBar();
  createScoreAndPlayerBox();
}

//functions to do with game stats;
function initiateEnding() {
  clearScoreAndPlayerBox(); //hides scores
  hideRockPaperScissorsIcons(); //hides the icons
  UI.sbDiv.remove(); //removes blue status box

  UI.gameOverviewContainer = document.createElement("div");
  UI.gameOverviewHeading = document.createElement("h3");
  UI.table = document.createElement("div");
  UI.gr1 = document.createElement("tr");
  UI.gdr1h1 = document.createElement("th");
  UI.gdr1h2 = document.createElement("th");
  UI.gdr1h3 = document.createElement("th");

  UI.gr2 = document.createElement("tr");
  UI.gdr2d1 = document.createElement("td");
  UI.gd1p1 = document.createElement("td");
  UI.gd1p2 = document.createElement("td");

  UI.gr3 = document.createElement("tr");
  UI.gdr3d2 = document.createElement("td");
  UI.gd2p1 = document.createElement("td");
  UI.gd2p2 = document.createElement("td");

  UI.gr4 = document.createElement("tr");
  UI.gdr4d3 = document.createElement("td");
  UI.gd3p1 = document.createElement("td");
  UI.gd3p2 = document.createElement("td");

  UI.gr5 = document.createElement("tr");
  UI.gdr5d4 = document.createElement("td");
  UI.gd4p1 = document.createElement("td");
  UI.gd4p2 = document.createElement("td");

  UI.gr6 = document.createElement("tr");
  UI.gdr6d5 = document.createElement("td");
  UI.gd5p1 = document.createElement("td");
  UI.gd5p2 = document.createElement("td");

  UI.gameOverviewContainer.classList.add("overview");

  UI.gameOverviewHeading.innerText = "Game Overview:";
  UI.gdr1h1.textContent = "Stats";
  UI.gdr1h2.textContent = playerOne.username;
  UI.gdr1h3.textContent = playerTwo.username;

  UI.gdr2d1.textContent = "Number of times 'rock' was chosen";
  UI.gd1p1.textContent = gameStats.nTimesP1ThrewRock;
  UI.gd1p2.textContent = gameStats.nTimesP2ThrewRock;

  UI.gdr3d2.textContent = "Number of times 'paper' was chosen ";
  UI.gd2p1.textContent = gameStats.nTimesP1ThrewPaper;
  UI.gd2p2.textContent = gameStats.nTimesP2ThrewPaper;

  UI.gdr4d3.textContent = "Number of times 'scissors' was chosen ";
  UI.gd3p1.textContent = gameStats.nTimesP1ThrewScissors;
  UI.gd3p2.textContent = gameStats.nTimesP2ThrewScissors;

  UI.gdr5d4.textContent = "Number of losses";
  UI.gd4p1.textContent = playerTwo.score;
  UI.gd4p2.textContent = playerOne.score;

  UI.gdr6d5.textContent = "Final Score";
  UI.gdr6d5.classList.add("final");
  UI.gd5p1.textContent = playerOne.score;
  UI.gd5p1.classList.add("final");
  UI.gd5p2.textContent = playerTwo.score;
  UI.gd5p2.classList.add("final");

  UI.gr1.appendChild(UI.gdr1h1);
  UI.gr1.appendChild(UI.gdr1h2);
  UI.gr1.appendChild(UI.gdr1h3);

  UI.gr2.appendChild(UI.gdr2d1);
  UI.gr2.appendChild(UI.gd1p1);
  UI.gr2.appendChild(UI.gd1p2);

  UI.gr3.appendChild(UI.gdr3d2);
  UI.gr3.appendChild(UI.gd2p1);
  UI.gr3.appendChild(UI.gd2p2);

  UI.gr4.appendChild(UI.gdr4d3);
  UI.gr4.appendChild(UI.gd3p1);
  UI.gr4.appendChild(UI.gd3p2);

  UI.gr5.appendChild(UI.gdr5d4);
  UI.gr5.appendChild(UI.gd4p1);
  UI.gr5.appendChild(UI.gd4p2);

  UI.gr6.appendChild(UI.gdr6d5);
  UI.gr6.appendChild(UI.gd5p1);
  UI.gr6.appendChild(UI.gd5p2);

  UI.table.appendChild(UI.gr1);
  UI.table.appendChild(UI.gr2);
  UI.table.appendChild(UI.gr3);
  UI.table.appendChild(UI.gr4);
  UI.table.appendChild(UI.gr5);
  UI.table.appendChild(UI.gr6);

  UI.gameOverviewContainer.appendChild(UI.gameOverviewHeading);
  UI.gameOverviewContainer.appendChild(UI.table);

  UI.uiDiv.appendChild(UI.gameOverviewContainer);

  createPlayAgainButton();
}

//-------(functions relating to game logic)

//game gatekeeper functions
function ifClickIsAValidPlayStartGame(e) {
  if (
    playerOne.score >= gameElmnts.winningScore ||
    playerTwo.score >= gameElmnts.winningScore
  ) {
    //remove event handler
    //toggle css class to remove hover effects, or reflect fact that game ended
    UI.rPSC.removeEventListener("click", ifClickIsAValidPlayStartGame);

    console.log("event handler was deleted. wow!");
    //disables hover effect during round
    disableMouseOverOnButtons();
  } else {
    //game is still in play

    if (
      e.target === rock.img ||
      e.target === paper.img ||
      e.target === scissors.img
    ) {
      //valid move
      gamePlay(e);
    }
  }
}

function clearStoredScores() {
  playerOne.score = 0;
  playerTwo.score = 0;
}
function clearRounds() {
  gameElmnts.round = 0;
}

//reset stats
function resetStats() {
  gameStats.nTimesP1ThrewRock = 0;
  gameStats.nTimesP2ThrewRock = 0;
  gameStats.nTimesP1ThrewPaper = 0;
  gameStats.nTimesP2ThrewPaper = 0;
  gameStats.nTimesP1ThrewScissors = 0;
  gameStats.nTimesP2ThrewScissors = 0;
  gameStats.nTimesTie = 0;
}

function changeMaxWinningScore(num) {
  //allows for functionality if we want to dynamically allow user to pick
  //what score to play to
  gameElmnts.winningScore = num;
}

//checks if the winning score has been met, returns true or false
function ifGameIsOver() {
  if (
    playerOne.score >= gameElmnts.winningScore ||
    playerTwo.score >= gameElmnts.winningScore
  ) {
    return true;
  } else {
    return false;
  }
}

//player 2 functions only:
//get's the computers move randomly
function getComputerChoice() {
  let randomMove = Math.floor(Math.random() * playsLower.length + 1) - 1;
  //final negative one accounts for array index
  return playsLower[randomMove];
}

//game evaluation logic:

//checks if it's a tied game
function isTie(player1Move, player2Move) {
  if (player1Move === player2Move) {
    return true;
  } else {
    return false;
  }
}

//determines if 1st player is winner
function isWinner(winnerPlayerMove, loserPlayerMove) {
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

///full game play logic, originating from click, to starting the ending stat screen.
function gamePlay(event) {
  //gets user move
  playerOne.currentMove = event.target.id;
  //disables the event listener, so users arent playing too fast
  UI.rPSC.removeEventListener("click", ifClickIsAValidPlayStartGame);
  //disables hover effect during round
  disableMouseOverOnButtons();
  //updates game round count
  gameElmnts.round++;
  //updates round text on DOM
  UI.rNum.innerText = gameElmnts.round;
  showingMoveForPlayer(playerOne.currentMove, "p1");

  //updates plays on the play-by-play box on the dom
  updateBox(`${playerOne.username} plays ${playerOne.currentMove}.`, 400);
  playerTwo.currentMove = getComputerChoice(); //gets pc move
  updateBox("...", 900); //shows pc move
  updateBox(`${playerTwo.username} plays ${playerTwo.currentMove}.`, 1600); //shows pc move

  gameElmnts.isTie = isTie(playerOne.currentMove, playerTwo.currentMove); //checks for a tie

  if (gameElmnts.isTie === true) {
    showMovesForTie(playerTwo.currentMove); //shows p2 move on the h1 text
  } else {
    showingMoveForPlayer(playerTwo.currentMove, "p2"); //updates h1 text
  }

  if (gameElmnts.isTie === false) {
    playerOne.isRoundWinner = isWinner(
      //checks for p1 win returns true or false
      playerOne.currentMove,
      playerTwo.currentMove
    );
    playerTwo.isRoundWinner = isWinner(
      //checks for p2 win returns true or false
      playerTwo.currentMove,
      playerOne.currentMove
    );

    if (playerOne.isRoundWinner === true) {
      //if p1 is round winner the score for p1 is updated
      //updates player score on dom
      playerOne.score++;
      UI.p1DivForScore.innerText = playerOne.score;
      setTimeout(() => {
        sounds.win.play();
      }, 2600);
      //`${playerOne.username} played ${playerOne.currentMove} and ${playerTwo.username} played ${playerTwo.currentMove}. \n You win!!`
      updateBox("YOU WON!", 2600);
    } else if (playerTwo.isRoundWinner === true) {
      //if p2 is round winner the score for p2 is updated
      //updates player score on the dom
      playerTwo.score++;
      UI.p2DivForScore.innerText = playerTwo.score;
      setTimeout(() => {
        sounds.lose.play();
      }, 2600);
      //`${playerTwo.username} played ${playerTwo.currentMove} and ${playerOne.username} played ${playerOne.currentMove}. \n You lost.`
      updateBox("YOU LOST", 2600);
    }
  } else {
    //counts ties in game play
    gameStats.nTimesTie++;
    setTimeout(() => {
      sounds.tie.play();
    }, 2600);
    updateBox("TIE!", 2600);
  }

  if (playerOne.currentMove === "paper") {
    gameStats.nTimesP1ThrewPaper++;
  } else if (playerOne.currentMove === "scissors") {
    gameStats.nTimesP1ThrewScissors++;
  } else {
    gameStats.nTimesP1ThrewRock++;
  }
  if (playerTwo.currentMove === "paper") {
    gameStats.nTimesP2ThrewPaper++;
  } else if (playerTwo.currentMove === "scissors") {
    gameStats.nTimesP2ThrewScissors++;
  } else {
    gameStats.nTimesP2ThrewRock++;
  }
  setTimeout(() => {
    removeColorClass(rock, "p1");
    removeColorClass(rock, "p2");
    removeColorClass(rock, "tie");
    removeColorClass(paper, "p1");
    removeColorClass(paper, "p2");
    removeColorClass(paper, "tie");
    removeColorClass(scissors, "p1");
    removeColorClass(scissors, "p2");
    removeColorClass(scissors, "tie");
    UI.gameHandler = UI.rPSC.addEventListener(
      "click",
      ifClickIsAValidPlayStartGame
    );
    rock.button.classList.add("hoverOnIcon");
    paper.button.classList.add("hoverOnIcon");
    scissors.button.classList.add("hoverOnIcon");
  }, 3700);

  if (
    playerOne.score === gameElmnts.winningScore ||
    playerTwo.score === gameElmnts.winningScore
  ) {
    //deletes event handler if max score has been reached before the event is clicked again.
    disableMouseOverOnButtons();
    UI.rPSC.removeEventListener("click", ifClickIsAValidPlayStartGame);
    setTimeout(() => {
      initiateEnding();
    }, 3700);
  }
}

//****----------EVENT LISTENERS-------****

rock.button.addEventListener("mouseover", () =>
  addColorClass(rock, "rpsH1Hover")
); //following events are for the mouseover color changes
paper.button.addEventListener("mouseover", () =>
  addColorClass(paper, "rpsH1Hover")
);
scissors.button.addEventListener("mouseover", () =>
  addColorClass(scissors, "rpsH1Hover")
);
rock.button.addEventListener("mouseout", () =>
  removeColorClass(rock, "rpsH1Hover")
);
paper.button.addEventListener("mouseout", () =>
  removeColorClass(paper, "rpsH1Hover")
);
scissors.button.addEventListener("mouseout", () =>
  removeColorClass(scissors, "rpsH1Hover")
);
let checkForInput = document.addEventListener("submit", function (e) {
  //runs after username submitted
  //checks for input
  if (UI.nameInput.value.length > 1) {
    gotUserNameStart(e);
  } else {
    UI.nameInput.placeholder = "Please type in a username";
  }
});
let startButtonIsThereCheck = UI.uiDiv.addEventListener(
  "click",
  function (event) {
    isThereAStartButton(event);
  }
);

//****---------Function Calls
getUserName();
