//logic for rock paper scissors implementation
    //additional fun flare: create two user names for each player.
const PLAYER1 = "Computer";
//Error checking to ensure that the username is not empty or too long.
let playerUserName = "";
do {
    playerUserName = prompt("What is your name?").toLowerCase(); //Cleaning the data.
    }
while (playerUserName.length === 0 || playerUserName.length > 16)

    let firstUserNameLetter = playerUserName[0].toUpperCase();
const PLAYER2 = playerUserName.replace(playerUserName[0], firstUserNameLetter);

console.log("Welcome " + PLAYER2 +"! \nAre you ready to play Rock Paper Scissors with the " + PLAYER1 + "?");


    //problem to break down:
    //game rules:
        //players can do three things: rock, paper or scissors
const PLAYS = ["Rock", "Paper", "Scissors"];

        //declare moves as a global const array

function getComputerChoice() {
    //computer needs to pick a move getComputerChoice()
    console.log(PLAYS);
        //a random choice is generated from the three options --> may need to pass in the choices array
            //using the math library allow for a choice to be picked from the moves array. (Allows for scalability vs hardcoding). 
                //return the move
}

getComputerChoice();
                
    //user needs to pick a move getUserChoice()
        //prompt user for a move
            //case insensitive support.
            //must be of a valid length between the len of rock and scissors. We may need to pass in the choices array.

    //user vs computer needs to be evaluated

    //a single round is played via a function call. -> playround() player selection and computer selection is the input;
        //takes in two data pieces: player's move and computers move
        //evaluates winner
        //winner is returned from function in the form of a string.

    
//game function is created: 
    //plays five rounds of rock paper scissors, keeps track of the win/losses.
    //for five times
        //play round is called
            //return winner of the round.
            //update score chart

//function to create: getComputerChoice
//randomly picks rock, paper, or scissors


