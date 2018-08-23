function boardUpdated(data) {
    console.log('boardUpdated')
    if(!data){return;} //if there's nothing in data, don't update board

    player1.name = data.player1.name;
    player1.mark = data.player1.mark;
    player1.victories = data.player1.victories;
    player2.name = data.player2.name;
    player2.mark = data.player2.mark;
    player2.victories = data.player2.victories;
    if (data.currentPlayer.mark === 'X') {
        currentPlayer = player1;
    } else {
        currentPlayer = player2;
    }
    booleanWinGame = data.booleanWinGame;
    booleanDrawGame = data.booleanDrawGame
    drawVictories = data.drawVictories;
    boardSize =  data.boardSize;
    if (currentGameBoard.length) {
        convertToArray(data.currentGameBoard);
        updateGameBoard();
    }
    if(booleanWinGame%10){
        setTimeout(function(){showResultScreen(false)},700);
    }
    if(booleanDrawGame%10){
        setTimeout(function(){showResultScreen(true)},700);
    }
}

function saveGameData() {
    ticTacToe.saveState({
        player1: {
            name: player1.name,
            mark: player1.mark,
            victories: player1.victories
        },
        player2: {
            name: player2.name,
            mark: player2.mark,
            victories: player2.victories
        },
        currentPlayer: currentPlayer,
        drawVictories: drawVictories,
        currentGameBoard: convertToObject(),
        booleanWinGame: booleanWinGame,
        booleanDrawGame: booleanDrawGame,
        boardSize: boardSize
    });
}
function convertToObject() {
    console.log("convertToObject")
    var objectCurrentGameBoard = {}
    var counter = 0;
    for (var i = 0; i < currentGameBoard.length; i++) {
        for (var j = 0; j < currentGameBoard.length; j++) {
            var targetElement = currentGameBoard[i][j].find('.centerText')
            if (!targetElement.text()) {
                objectCurrentGameBoard[counter] = "fillerText"
            } else {
                objectCurrentGameBoard[counter] = targetElement.text();
            }

            counter++
        }
    }
    console.log(objectCurrentGameBoard)
    return objectCurrentGameBoard;
}
function convertToArray(objectCurrentGameBoardP) {
    console.log("convertToArray")
    var counter = 0;
    for (var i = 0; i < currentGameBoard.length; i++) {
        for (var j = 0; j < currentGameBoard.length; j++) {
            var targetElement = currentGameBoard[i][j].find('.centerText')
            if (objectCurrentGameBoardP[counter] === "fillerText") {
                targetElement.text("");
            } else {
                targetElement.text(objectCurrentGameBoardP[counter]).animate({'opacity':1},500);
            }
            counter++
        }
    }
    return currentGameBoard;
}
function updateGameBoard() {
    console.log('updateGameBoard')
    for (var i = 0; i < currentGameBoard.length; i++) {
        for (var j = 0; j < currentGameBoard.length; j++) {
            $("[row=i]>[column=j]").text(currentGameBoard[i][j].text())
        }
    }
}

