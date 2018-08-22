function checkWinCondition(positionP, currentplayerP) {
    for (var directionIndex = 0; directionIndex < directionArray.length - 2; directionIndex += 2) {
        currentCounter = 0;
        checkingInOneDirection(directionIndex, positionP);
        checkingInOneDirection(directionIndex + 1, positionP);
        if (currentCounter === winCounter) {
            alert(currentplayerP + " won!!!!!");
            return;
        }
    }
    checkDrawGame();
}

function checkingInOneDirection(indexP, positionP) {
    var currentMark = currentGameBoard[positionP[0]][positionP[1]]
    var newPosition = positionP.map((item, index) => { return item + directionArray[indexP][index] })

    newPosition = newPosition.filter(num => { return -1 < num && num < boardSize })
    console.log(newPosition)

    if (newPosition.length !== 2) {
        console.log("Position is off board!")
        return;
    }
    console.log("Position is fine!")
    var newPositionMark = currentGameBoard[newPosition[0]][newPosition[1]]
    if (currentMark === newPositionMark) {
        currentCounter++
        return checkingInOneDirection(indexP, newPosition)
    }
    console.log(currentCounter)
}


function checkDrawGame() {
    var isBoardFull = true;
    for (var boardIndex = 0; boardIndex < currentGameBoard.length; boardIndex++) {
        currentGameBoard[boardIndex] = currentGameBoard[boardIndex].filter(num => num);
        if (currentGameBoard[boardIndex].length !== 3) {
            isBoardFull = false;
        }
    }
    if (isBoardFull) {
        alert("GAME IS A DRAW");
    }
}
