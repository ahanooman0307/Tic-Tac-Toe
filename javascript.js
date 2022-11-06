const player = (sign) => {
    this.sign = sign;
    const getSign = () => {
        return sign;
    }
    return{getSign};
}




const Gameboard = (() => {

    const gameboard = ['', '', '', '', '', '', '', '', ''];
        
    const setField = (index, sign) => {
        gameboard[index] = sign;
    };

    const getField = (index) => {
        return gameboard[index];
    }

    const getBoard = () => {
        return gameboard;
    }
       
    return{setField, getField, getBoard}

})();


const playGame = (() => {
    const player1 = player('X');
    const player2 = player('O');
    let round = 0;
    let currentPlayer;
    let sign;

    const playRound = (index) => {
        if(round == 9 || Gameboard.getField(index) != '') return;
        if(round == 0){
            currentPlayer = player1;
        }
        sign = currentPlayer.getSign();
        Gameboard.setField(index, sign);
        checkWinner();
        switchPlayer();
        
        round++;


    }

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

    function checkWinner() {
        winningCombinations.forEach((combination) => { // checks each possibility for the current player to see if their signs matches with the possible combinations
            if (Gameboard.getBoard()[combination[0]] == sign && Gameboard.getBoard()[combination[1]] == sign && Gameboard.getBoard()[combination[2]] == sign) {
                console.log('winner!');
            } 
        })
    }
    return{playRound, currentPlayer};

})();

const displayGame = (() => {
    const boxes = document.querySelectorAll(".item");

    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            if(e.target.textContent != '') return;
            //make an if statement here to check if a move can be made
            playGame.playRound(parseInt(e.target.dataset.index));
            console.log(e.target.dataset.index);
            updateGameBoard();
        })
    })

    const updateGameBoard = () => {
        for (let i = 0; i < boxes.length; i++) {
          boxes[i].textContent = Gameboard.getField(i);
        }
      };
})();