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
            gameOver = true;
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

    const getGameOver = () => {
        return gameOver;
    }

    const getRound = () => {
        return round;
    }

    
    return{playRound, resetGame, getGameOver, getRound};

})();

const displayGame = (() => {
    const boxes = document.querySelectorAll(".item");
    const reset = document.querySelector(".reset");
    const game = document.querySelector('.game');
    const computerOption = document.querySelector(".computer");
    const playerOption = document.querySelector(".players");
    let computer = false;
    let cornerFirst = false;
    let normal = false;
    let hard = true;


    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            if(e.target.textContent != '') return;
            //make an if statement here to check if a move can be made
            playGame.playRound(parseInt(e.target.dataset.index));
            console.log(e.target.dataset.index);
            updateGameBoard();
            console.log(playGame.getRound());
        
            if(normal == true){
                randomMove();
            }
            if(hard == true){
                hardMode();
            }
            if(playGame.getGameOver() == true){
                cornerFirst = false;
            }

        });
    });
    const hardMode = (() => {
        if(computer == true && playGame.getGameOver() == false){

            //first move
            if(playGame.getRound() == 1){
                if(((Gameboard.getField(0) == 'X') || Gameboard.getField(2) == 'X' || Gameboard.getField(6) == 'X' || Gameboard.getField(8) == 'X')){
                    playGame.playRound(4);
                    updateGameBoard();
                    cornerFirst = true;
                 }
                 if(((Gameboard.getField(4) == 'X')) || (Gameboard.getField(1) == 'X') || (Gameboard.getField(3) == 'X')){
                     playGame.playRound(0);
                     updateGameBoard();
                 }
                 if((Gameboard.getField(5) == 'X') ){
                     playGame.playRound(2);
                     updateGameBoard();
                 }
                 if((Gameboard.getField(7) == 'X') ){
                     playGame.playRound(1);
                     updateGameBoard();
                 }
            }
 

            if(playGame.getRound() == 3 && cornerFirst == true){
                console.log("cheeeese");
                if(((Gameboard.getField(0) == 'X') && (Gameboard.getField(2) == 'X'))){
                    playGame.playRound(1);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(0) == 'X') && (Gameboard.getField(6) == 'X'))){
                    playGame.playRound(3);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(6) == 'X') && (Gameboard.getField(8) == 'X'))){
                    playGame.playRound(7);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(2) == 'X') && (Gameboard.getField(8) == 'X'))){
                    playGame.playRound(5);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(0) == 'X') && (Gameboard.getField(3) == 'X'))){
                    playGame.playRound(6);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(0) == 'X') && (Gameboard.getField(1) == 'X'))){
                    playGame.playRound(2);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(2) == 'X') && (Gameboard.getField(5) == 'X'))){
                    playGame.playRound(8);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(6) == 'X') && (Gameboard.getField(7) == 'X'))){
                    playGame.playRound(8);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(6) == 'X') && (Gameboard.getField(3) == 'X'))){
                    playGame.playRound(0);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(8) == 'X') && (Gameboard.getField(5) == 'X'))){
                    playGame.playRound(2);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(0) == 'X') && (Gameboard.getField(8) == 'X'))){
                    playGame.playRound(1);
                    updateGameBoard();

                }
                else if(((Gameboard.getField(6) == 'X') && (Gameboard.getField(2) == 'X'))){
                    playGame.playRound(7);
                    updateGameBoard();

                }
                else{
                    randomMove();
                }

            }
            if(((playGame.getRound() == 3) || (playGame.getRound() == 5) || playGame.getRound() == 7) && cornerFirst == false){
                
                    //code to make game hard
                    if(((Gameboard.getField(4) == 'X') && (Gameboard.getField(1) == 'X') && (Gameboard.getField(7) == ''))){
                        playGame.playRound(7);
                        updateGameBoard();
                    }
                    else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(6) == 'O') && (Gameboard.getField(2) == ''))){
                        playGame.playRound(2);
                        updateGameBoard();
                    }
                    else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(2) == 'O') && (Gameboard.getField(6) == ''))){
                        playGame.playRound(6);
                        updateGameBoard();
                    }
                    else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(8) == 'O') && (Gameboard.getField(0) == ''))){
                        playGame.playRound(0);
                        updateGameBoard();
                    }
                    else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(0) == 'O') && (Gameboard.getField(8) == ''))){
                        playGame.playRound(8);
                        updateGameBoard();
                    }
                    else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(1) == 'O') && (Gameboard.getField(7) == ''))){
                        playGame.playRound(7);
                        updateGameBoard();
                        console.log(7);
                    }
                    else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(3) == 'O') && (Gameboard.getField(5) == ''))){
                        playGame.playRound(5);
                        updateGameBoard();
                        console.log(7);
                    }
                    if(((Gameboard.getField(4) == 'X') && (Gameboard.getField(3) == 'X') && (Gameboard.getField(5) == ''))){
                        playGame.playRound(5);
                        updateGameBoard();
                    }
                    if(((Gameboard.getField(4) == 'X') && (Gameboard.getField(5) == 'X') && (Gameboard.getField(3) == ''))){
                        playGame.playRound(3);
                        updateGameBoard();
                    }
                    if(((Gameboard.getField(4) == 'X') && (Gameboard.getField(7) == 'X') && (Gameboard.getField(1) == ''))){
                        playGame.playRound(1);
                        updateGameBoard();
                    }
                    if(((Gameboard.getField(4) == 'X') && (Gameboard.getField(2) == 'X') && (Gameboard.getField(6) == ''))){
                        playGame.playRound(6);
                        updateGameBoard();
                    }
                    if(((Gameboard.getField(4) == 'X') && (Gameboard.getField(6) == 'X') && (Gameboard.getField(2) == ''))){
                        playGame.playRound(2);
                        updateGameBoard();
                    }
                    if(((Gameboard.getField(4) == 'X') && (Gameboard.getField(0) == 'X') && (Gameboard.getField(8) == ''))){
                        playGame.playRound(8);
                        updateGameBoard();
                    }
                    if(((Gameboard.getField(4) == 'X') && (Gameboard.getField(8) == 'X') && (Gameboard.getField(0) == ''))){
                        playGame.playRound(0);
                        updateGameBoard();
                    }
                    if((((Gameboard.getField(3) == 'X') && (Gameboard.getField(5) == 'X')) && (Gameboard.getField(4) == ''))){
                        console.log('middle');
                        playGame.playRound(4);
                        updateGameBoard();
                    }
                    if(((Gameboard.getField(1) == 'X') && (Gameboard.getField(7) == 'X') && (Gameboard.getField(4) == ''))){
                        playGame.playRound(4);
                        updateGameBoard();
                    }
                
            }
            if(playGame.getRound() == 5 && cornerFirst == true) {
                if(((Gameboard.getField(0) == 'X') && (Gameboard.getField(1) == 'X') && (Gameboard.getField(2) == ''))){
                    playGame.playRound(2);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(6) == 'O') && (Gameboard.getField(2) == ''))){
                    playGame.playRound(2);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(2) == 'O') && (Gameboard.getField(6) == ''))){
                    playGame.playRound(6);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(8) == 'O') && (Gameboard.getField(0) == ''))){
                    playGame.playRound(0);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(0) == 'O') && (Gameboard.getField(8) == ''))){
                    playGame.playRound(8);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(1) == 'O') && (Gameboard.getField(7) == ''))){
                    playGame.playRound(7);
                    updateGameBoard();
                    console.log(7);
                }
                else if(((Gameboard.getField(4) == 'O') && (Gameboard.getField(3) == 'O') && (Gameboard.getField(5) == ''))){
                    playGame.playRound(5);
                    updateGameBoard();
                    console.log(7);
                }
                else if(((Gameboard.getField(0) == 'X') && (Gameboard.getField(3) == 'X') && (Gameboard.getField(6) == ''))){
                    playGame.playRound(6);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(2) == 'X') && (Gameboard.getField(5) == 'X') && (Gameboard.getField(8) == ''))){
                    playGame.playRound(8);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(2) == 'X') && (Gameboard.getField(5) == 'X') && (Gameboard.getField(8) == ''))){
                    playGame.playRound(8);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(8) == 'X') && (Gameboard.getField(7) == 'X') && (Gameboard.getField(6) == ''))){
                    playGame.playRound(6);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(8) == 'X') && (Gameboard.getField(5) == 'X') && (Gameboard.getField(2) == ''))){
                    playGame.playRound(2);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(6) == 'X') && (Gameboard.getField(3) == 'X') && (Gameboard.getField(0) == ''))){
                    playGame.playRound(0);
                    updateGameBoard();
                }
                else if(((Gameboard.getField(6) == 'X') && (Gameboard.getField(7) == 'X') && (Gameboard.getField(8) == ''))){
                    playGame.playRound(8);
                    updateGameBoard();
                }
          
                else{
                    randomMove();
                }
            }

            //prevents missing cases from not playing 
            if(playGame.getRound() == 3 || playGame.getRound() == 7 || playGame.getRound() == 5){
                randomMove();
                console.log("random move");
            }            
            console.log("computer turn");
            
        }
    });
    const randomMove = () => {
        if(computer == true && playGame.getGameOver() == false){
            let played = false;
            while(played == false){
                let random = Math.floor(Math.random() * 10);
                if(Gameboard.getField(random) == ''){
                    playGame.playRound(random);
                    updateGameBoard();
                    played = true;
                }
            }
            
            console.log("computer turn");
        }
    };


    computerOption.addEventListener('click', () => {
        const welcome = document.querySelector(".welcome");
        computer = true;
        welcome.style.display = "none";
        game.style.display = "block";

    });

    playerOption.addEventListener('click', () => {
        const welcome = document.querySelector(".welcome");
        computer = false;
        welcome.style.display = "none";
        game.style.display = "block";
    })

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