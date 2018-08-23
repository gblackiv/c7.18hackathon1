function chooseSquare(event) {
    // thisPlayer !== currentPlayer{
    //     return;
    // }
    var clickedSquare = $(event.currentTarget);
    clickedSquare.text(currentPlayer.mark)
    var column = clickedSquare.attr("column")
    var row = clickedSquare.parent().attr("row")
    clickedSquare.off("click");
    checkWinCondition([Number(row), Number(column)]);
    switchPlayer();
    saveGameData();
}

function checkWinCondition(positionP) {
    var winCounter = (boardSize - 1);
    for (var directionIndex = 0; directionIndex < directionArray.length - 1; directionIndex += 2) {
        currentCounter = 0;
        checkingInOneDirection(directionIndex, positionP);
        checkingInOneDirection(directionIndex + 1, positionP);
        if (currentCounter === winCounter) {
            booleanWinGame = 1;
            //showResultScreen(false);
            return;
        }
    }
    checkDrawGame();
}

function checkingInOneDirection(indexP, positionP) {
    var currentMark = currentGameBoard[positionP[0]][positionP[1]].text()
    var newPosition = positionP.map((item, index) => { return item + directionArray[indexP][index] })

    newPosition = newPosition.filter(num => { return -1 < num && num < boardSize })

    if (newPosition.length !== 2) {
        return;
    }
    var newPositionMark = currentGameBoard[newPosition[0]][newPosition[1]].text()
    if (currentMark === newPositionMark) {
        currentCounter++
        console.log(currentCounter)
        return checkingInOneDirection(indexP, newPosition)
    }
}


function checkDrawGame() {
    var isBoardFull = true;
    for (var boardIndex = 0; boardIndex < currentGameBoard.length; boardIndex++) {
        for (var squareIndex = 0; squareIndex < currentGameBoard.length; squareIndex++) {
            if (!currentGameBoard[boardIndex][squareIndex].text()) {
                isBoardFull = false;
            }
        }
    }
    if (isBoardFull) {
        booleanDrawnGame = 1;
        //showResultScreen(true);
    }
}


function showResultScreen(isItADraw = false) {
    $('.gameBoardContainer').empty();
    if (isItADraw) {
        var message = $('<h2>', { 'text': 'Game is a draw!' });
        drawVictories++
    } else {
        var message = $('<h2>', { 'text': currentPlayer.name + " has won!" });
        currentPlayer.victories++
    }
    $('.gameBoardContainer').append(message);
    var resetButton = $('<button>', { class: 'resetButton', 'text': 'Play Again' });
    $('.gameBoardContainer').append(resetButton);
    $('.resetButton').click(resetGame)
}


//Firebase multiplayer

var booleanWinGame = 0;
var booleanDrawnGame = 0;

var ticTacToe = new GenericFBModel('abc123xyz', boardUpdated);

function boardUpdated(data) {
    console.log('boardUpdated')
    player1.name = data.player1.name;
    player1.mark = data.player1.mark;
    player1.victories = data.player1.victories;
    player2.name = data.player2.name;
    player2.mark = data.player2.mark;
    player2.victories = data.player2.victories;
    if (data.currentPlayer.name === 'Player 1') {
        currentPlayer = player1;
    } else {
        currentPlayer = player2;
    }
    booleanWinGame = data.booleanWinGame;
    booleanDrawnGame = data.booleanDrawnGame
    drawVictories = data.drawVictories;
    //check win conditions
    if (currentGameBoard.length) {
        convertToArray(data.currentGameBoard);
        updateGameBoard();
    }
    if(booleanWinGame){

    }
    if(booleanDrawnGame){
        showResultScreen(true);
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
        booleanDrawnGame: booleanDrawnGame,
    });
}


function convertToObject() {
    var objectCurrentGameBoard = {}
    var counter = 0;
    for (var i = 0; i < currentGameBoard.length; i++) {
        for (var j = 0; j < currentGameBoard.length; j++) {
            if (!currentGameBoard[i][j].text()) {
                objectCurrentGameBoard[counter] = "fillerText"
            } else {
                objectCurrentGameBoard[counter] = currentGameBoard[i][j].text();
            }

            counter++
        }
    }
    return objectCurrentGameBoard;
}

function convertToArray(objectCurrentGameBoardP) {
    var counter = 0;
    for (var i = 0; i < currentGameBoard.length; i++) {
        for (var j = 0; j < currentGameBoard.length; j++) {
            if (objectCurrentGameBoardP[counter] === "fillerText") {
                currentGameBoard[i][j].text("");
            } else {
                currentGameBoard[i][j].text(objectCurrentGameBoardP[counter]);
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
