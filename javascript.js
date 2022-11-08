const player = (sign) => {
    this.sign = sign;
    const getSign = () => {
        return sign;
    }
    return{getSign};
}




const Gameboard = (() => {

    let gameboard = ['', '', '', '', '', '', '', '', ''];
        
    const setField = (index, sign) => {
        gameboard[index] = sign;
    };

    const getField = (index) => {
        return gameboard[index];
    }

    const getBoard = () => {
        return gameboard;
    }

    const resetGame = () => { //resets array for a new game
        gameboard = ['', '', '', '', '', '', '', '', ''];
    }
       
    return{setField, getField, getBoard, resetGame}

})();


const playGame = (() => {
    const user1 = document.querySelector('.user1');
    const user2 = document.querySelector('.user2');

    const player1 = player('X');
    const player2 = player('O');
    let round = 0; //keeps count of current round
    let currentPlayer; //current player's turn
    let sign; //variable to track sign of current player 
    let gameOver = false; //checks to see if the game is complete
    let user1Score = 0;
    let user2Score = 0; 

    const playRound = (index) => {
        if(round == 9 || Gameboard.getField(index) != '' || gameOver == true) return;
        if(round == 0){ //inititates first round
            currentPlayer = player1;
        }
        sign = currentPlayer.getSign();
        Gameboard.setField(index, sign);
        round = round + 1;
        checkWinner();
        switchPlayer();
        

    }

    //function to increase score at end of every round if there is a win
    const increaseScore = () => {
        if(currentPlayer == player1){
            user1Score++;
        }
        else if(currentPlayer == player2){
            user2Score++;
        }
    }

    //function to switch players after every move
    const switchPlayer = () => {
        if(currentPlayer == player1){
            currentPlayer = player2;
        }
        else if(currentPlayer == player2){
            currentPlayer = player1;
        }
    }

     // winning conditions
     const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    //function to display win after a win or loss occurs
    const displayWin = () => {
        const endPopUp = document.querySelector(".end");
        user1.textContent = `Player 1 Score: ${user1Score}`;
        user2.textContent = `Player 2 Score: ${user2Score}`;
        endPopUp.style.display = "flex";
    }

    //function to check if there is a winner after every move
    function checkWinner() {
        const endMessage = document.querySelector(".message");
        winningCombinations.forEach((combination) => { // checks each possibility for the current player to see if their signs matches with the possible combinations
            if (Gameboard.getBoard()[combination[0]] == sign && Gameboard.getBoard()[combination[1]] == sign && Gameboard.getBoard()[combination[2]] == sign) {
                console.log('winner!');
                if(currentPlayer == player1){
                    endMessage.textContent = "You Win!";
                    increaseScore();
                }

                if(currentPlayer == player2){
                    endMessage.textContent = "You Lose!";
                    increaseScore();
                }
                
                gameOver = true;
                console.log(`game finished: ${gameOver}`);
                console.log(`round: ${round}`);
                displayWin();
                return;
            } 
        })

        //if there is a draw
        if(round == 9 && gameOver == false){
            console.log(gameOver);
            endMessage.textContent = "It's a Draw!";
            displayWin();
        }
    }

    //function to reset the game
    const resetGame = () => {
        const endPopUp = document.querySelector(".end");
        round = 0;
        gameOver = false;
        currentPlayer = player1;
        endPopUp.style.display = "none";
    }

    
    return{playRound, resetGame};

})();

const displayGame = (() => {
    const boxes = document.querySelectorAll(".item");
    const reset = document.querySelector(".reset");

    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            if(e.target.textContent != '') return;
            //make an if statement here to check if a move can be made
            playGame.playRound(parseInt(e.target.dataset.index));
            console.log(e.target.dataset.index);
            updateGameBoard();
        })
    });

    reset.addEventListener('click', () => {
        Gameboard.resetGame();
        playGame.resetGame();
        updateGameBoard();
    })

    const updateGameBoard = () => {
        for (let i = 0; i < boxes.length; i++) {
          boxes[i].textContent = Gameboard.getField(i);
        }
      };
})();