formatting of the code:



Helper functions:

Event Listeners:


Main Game Event:

runGameLogic-
    Checks to see if the game is still in play via top score
        if not in play, deletes event handler.

        if game still active
            checks the click for a valid move
                if not a valid move, doesnt do anything.

                if a valid move
                    1.Do action for player one:
                        a. set the playermove variable
                       > b. update the h1 hover affect to be "p1 class"
                       > c. additional side effect for p1 choice?
                       >     -sound
                    2. Do action for Player two:
                        a. get the computer's play -> set p2 move
                      >  b. set the h1 hover class for p2
                      > c. additional side effects for p2
                      >      -sound
              

     if(playerOne.score === gameElmnts.winningScore || playerTwo.score === gameElmnts.winningScore) {
        //deletes event handler if max score has been reached before the event is clicked again.
        disableMouseOverOnButtons();