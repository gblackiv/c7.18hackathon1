function chooseSquare(event){
    var clickedSquare = $(event.currentTarget);
    clickedSquare.text(currentPlayer.mark)
    var column = clickedSquare.attr("column")
    var row = clickedSquare.parent().attr("row")
    clickedSquare.off("click");
    checkWinCondition([Number(row), Number(column)]);
    switchPlayer();
}

function checkWinCondition(positionP) {
    var winCounter = (boardSize-1);
    for (var directionIndex = 0; directionIndex < directionArray.length - 1; directionIndex += 2) {
        currentCounter = 0;
        checkingInOneDirection(directionIndex, positionP);
        checkingInOneDirection(directionIndex + 1, positionP);
        if (currentCounter === winCounter) {
            showWinScreen();
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
        console.log("Position is off board!")
        return;
    }
    console.log("Position is fine!")
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
        for (var squareIndex = 0; squareIndex < currentGameBoard.length; squareIndex++){
            if(!currentGameBoard[boardIndex][squareIndex].text()){
                isBoardFull = false;
            }
        }
    }
    if (isBoardFull) {
        alert("GAME IS A DRAW");
    }
}


function showWinScreen(){
    $('.gameBoardContainer').empty();
    $('.gameBoardContainer').append("<h2>"+currentPlayer.name + " has won!</h2>");
    currentPlayer.victories++
    var resetButton = $('<button>', {class: 'resetButton', 'text': 'Play Again'});
    $('.gameBoardContainer').append(resetButton);
    $('.resetButton').click(resetGame)
}
