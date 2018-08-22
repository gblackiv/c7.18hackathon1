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
