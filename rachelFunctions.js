function chooseSquare(event){
    var clickedSquare = $(event.currentTarget);
    clickedSquare.text(currentPlayer)
    var column = clickedSquare.attr("column")
    var row = clickedSquare.parent().attr("row")
    clickedSquare.off("click");
    checkWinCondition([Number(row), Number(column)]);
    switchPlayer();
}


var winCounter = 2

function checkWinCondition(positionP) {
    for (var directionIndex = 0; directionIndex < directionArray.length - 1; directionIndex += 2) {
        currentCounter = 0;
        checkingInOneDirection(directionIndex, positionP);
        checkingInOneDirection(directionIndex + 1, positionP);
        if (currentCounter === winCounter) {
            alert(currentPlayer + " won!!!!!");
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
