//-----------VARIABLES------------------------

const gameElmnts = { round: 0, winningScore: 10 };
//lets find the query selector elements
//first my goal is to include hover functionality

const rock = {};
const paper = {};
const scissors = {};
const playerOne = { score: 0 };
const playerTwo = { score: 0, username: "Computer" };

//query selectors
rock.h1 = document.querySelector("#h1Rock");
paper.h1 = document.querySelector("#h1Paper");
scissors.h1 = document.querySelector("#h1Scissors");
rock.button = document.querySelector("#buttonRock");
paper.button = document.querySelector("#buttonPaper");
scissors.button = document.querySelector("#buttonScissors");

//------------FUNCTIONS/METHODS

function addColor(nameOfObject) {
    nameOfObject.h1.classList.add("color");
}
function removeColor(nameOfObject) {
    nameOfObject.h1.classList.remove("color")
}




//----------EVENT LISTENERS
rock.button.addEventListener("mouseover", () => addColor(rock));
paper.button.addEventListener("mouseover", () => addColor(paper));
scissors.button.addEventListener("mouseover", () => addColor(scissors));
rock.button.addEventListener("mouseout", () => removeColor(rock));
paper.button.addEventListener("mouseout", () => removeColor(paper));
scissors.button.addEventListener("mouseout", () => removeColor(scissors));

const rpsContainer = document.querySelector("#rpsc");


const UI = {};
UI.uiDiv = document.querySelector("#nameBox");

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

getUserName();



let checkforInput = document.addEventListener("submit", function (e) {
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
});

let meet = document.querySelector(".startbutton");

let startButtonIsThereCheck = UI.uiDiv.addEventListener(
  "click",
  function (event) {
    let startB = event.target;
    if (
      startB.tagName === "BUTTON" &&
      startB.classList.contains("startButton")
    ) {
      gameElmnts.welcomeContainer.remove();
      rpsContainer.classList.remove("hidden");
      rpsContainer.classList.add("rpsStart");
      paper.button.classList.add("paperStart");
      scissors.button.classList.add("scissorsStart");
      rock.button.classList.add("rockStart");
      gameElmnts.scoreAndRoundContainer = document.createElement("div");
      gameElmnts.scoreAndRoundContainer.classList.add("flex", "cent");
      gameElmnts.gameScoreBox = document.createElement("span");
      gameElmnts.scoreBoxWelText = document.createElement("span");

      gameElmnts.scoreBoxUserContainer = document.createElement("div");
      gameElmnts.scoreBoxUserContainerP1 = document.createElement("span");
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

      gameElmnts.scoreBoxUserContainerP1.appendChild(
        gameElmnts.scoreBoxUNamesP1
      );
      gameElmnts.scoreBoxUserContainerP1.appendChild(
        gameElmnts.scoreBoxScoreP1
      );

      gameElmnts.scoreBoxUserContainerP2.appendChild(
        gameElmnts.scoreBoxUNamesP2
      );
      gameElmnts.scoreBoxUserContainerP2.appendChild(
        gameElmnts.scoreBoxScoreP2
      );

      gameElmnts.scoreBoxUserContainer.appendChild(
        gameElmnts.scoreBoxUserContainerP1
      );

      gameElmnts.scoreBoxUserContainer.appendChild(
        gameElmnts.scoreBoxUserContainerP2
      );

      gameElmnts.gameScoreBox.appendChild(gameElmnts.scoreBoxUserContainer);
      gameElmnts.roundBox.appendChild(gameElmnts.roundBoxDynamic);
      gameElmnts.scoreAndRoundContainer.appendChild(gameElmnts.roundBox);

      UI.uiDiv.appendChild(gameElmnts.scoreAndRoundContainer);
      UI.uiDiv.appendChild(gameElmnts.gameScoreBox);
    }
  }
);

const PLAYS = ["Rock", "Paper", "Scissors"];
const playsLower = PLAYS.map((e) => {
  return e.toLowerCase();
});
function getComputerChoice() {
  let randomMove = Math.floor(Math.random() * playsLower.length + 1) - 1; //final negative one accounts for array index
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

const maxRounds = 10;
let rockCK = document.querySelector("#rock");
rockCK.classList.add("rockStart");
let paperCK = document.querySelector("#paper");
paperCK.classList.add("paperStart");
let scissorsCK = document.querySelector("#scissors");
scissorsCK.classList.add("scissorsStart");

function gamePlay(event) {
  playerOne.currentMove = event.target.id;
  console.log(playerOne.currentMove);
  playerTwo.currentMove = getComputerChoice();
  console.log(playerTwo.currentMove);
  //update round counter
  gameElmnts.round++;
  gameElmnts.roundBoxDynamic.innerText = gameElmnts.round;
  let tieCheck = isTie(playerOne.currentMove, playerTwo.currentMove);
  console.log(tieCheck);
  playerOne.isRoundWinner = isWinner(
    playerOne.currentMove,
    playerTwo.currentMove
  );
  playerTwo.isRoundWinner = isWinner(
    playerTwo.currentMove,
    playerOne.currentMove
  );
  console.log("p1 winner?" + playerOne.isRoundWinner);
  console.log("p2 winner?" + playerTwo.isRoundWinner);
  if (playerOne.isRoundWinner) {
    playerOne.score++;
    gameElmnts.scoreBoxScoreP1.innerText = playerOne.score;
  } else if (playerTwo.isRoundWinner) {
    playerTwo.score++;
    gameElmnts.scoreBoxScoreP2.innerText = playerTwo.score;
  }
}
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
function startGameFlow() {
    getUserName(); //creates username prompts
}



//update the score board
function restartGame() {
  rpsContainer.classList.add("hidden");
  gameElmnts.scoreAndRoundContainer.remove();
  gameElmnts.gameScoreBox.remove();
  console.log("mooples");

  //what I want to happen is a overview flash of the winner and round info;
  //maybe keep a log of how many times the computer threw rock vs you?
  //keep a log of how many times the player one threw rock
  //after overview I want to create a reset button to have two options.
  //option one: change username and restart
  //option two: keep playing
  //additional options change game round play until functions
  //in order to accomplish this Ill need to make my code modular
}

let rockClicked = rockCK.addEventListener("click", function (event) {
  let roundStart = event.target;
  if (
    roundStart.tagName === "IMG" &&
    roundStart.classList.contains("rockStart")
  ) {
    if (
      playerOne.score >= gameElmnts.winningScore ||
      playerTwo.score >= gameElmnts.winningScore
    ) {
      console.log("done you can't play anymore");

      restartGame();
    } else {
      gamePlay(event);
    }
  }
});
let paperClicked = paperCK.addEventListener("click", function (event) {
  let roundStart = event.target;
  if (
    roundStart.tagName === "IMG" &&
    roundStart.classList.contains("paperStart")
  ) {
    if (
      playerOne.score >= gameElmnts.winningScore ||
      playerTwo.score >= gameElmnts.winningScore
    ) {
      console.log("done you can't play anymore");
      restartGame();
    } else {
      gamePlay(event);
    }
  }
});
let scissorsClicked = scissorsCK.addEventListener("click", function (event) {
  let roundStart = event.target;
  if (
    roundStart.tagName === "IMG" &&
    roundStart.classList.contains("scissorsStart")
  ) {
    if (
      playerOne.score >= gameElmnts.winningScore ||
      playerTwo.score >= gameElmnts.winningScore
    ) {
      console.log("done you can't play anymore");

      restartGame();
    } else {
      gamePlay(event);
    }
  }
});
