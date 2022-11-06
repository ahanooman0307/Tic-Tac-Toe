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

       
    return{setField, getField, gameboard}

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

    const checkWin = () => {
        
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