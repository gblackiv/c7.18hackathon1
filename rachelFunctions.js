function chooseSquare(event){
    if(whoAmI.mark !== currentPlayer.mark) {
        return;
    }
    var clickedSquareText = $(event.currentTarget).find('.centerText');
    clickedSquareText.text(currentPlayer.mark);
    clickedSquareText.animate({'opacity':1},500);
    var clickedSquare = $(event.currentTarget);
    var column = clickedSquare.attr("column")
    var row = clickedSquare.parent().attr("row")
    clickedSquare.off("click");
    checkWinCondition([Number(row), Number(column)]);
    switchPlayer();
    saveGameData();
    displayStats();
}

function checkWinCondition(positionP) {
    for (var directionIndex = 0; directionIndex < directionArray.length - 1; directionIndex += 2) {
        currentCounter = 0;
        checkingInOneDirection(directionIndex, positionP);
        checkingInOneDirection(directionIndex + 1, positionP);
        if (currentCounter === winCounter) {
            booleanWinGame = 11;
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
        booleanDrawGame = 11;
    }
}


function showResultScreen(isItADraw = false) {
    $('.gameBoardContainer').empty();
    if (isItADraw) {
        var message = $('<h2>', { 'text': 'Game is a draw!' });
        drawVictories++
    } else {
        var message = $('<h2>', {
            'text': currentPlayer.name + " has won!"});
        currentPlayer.victories++
    }
    $('.gameBoardContainer').append(message);
    var resetButton = $('<button>', { class: 'resetButton', 'text': 'Play Again' });
    $('.gameBoardContainer').append(resetButton);
    $('.resetButton').click(resetGame)
}


//Firebase
var ticTacToe = new GenericFBModel('abc123xyz', boardUpdated);
//click start game  --> ticTacToe.saveState({default data here, add player name});
//click join game --> become player2, load game board as is, add name to player list
//click enabled only for current player
//who am i variable (player 1 or player 2)


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

//startButtonFunction - ticTacToe.saveState, player1 data
//joinButtonFunction - ticTacToe.saveState, player2 data

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
