function chooseSquare(event){
    var clickedSquareText = $(event.currentTarget).find('.centerText');
    clickedSquareText.text(currentPlayer.mark);
    clickedSquareText.animate({'opacity':1},500);
    var clickedSquare = $(event.currentTarget);
    var column = clickedSquare.attr("column")
    var row = clickedSquare.parent().attr("row")
    clickedSquare.off("click");
    checkWinCondition([Number(row), Number(column)]);
    switchPlayer();
    displayStats();
}

function checkWinCondition(positionP) {

    for (var directionIndex = 0; directionIndex < directionArray.length - 1; directionIndex += 2) {
        currentCounter = 0;
        lineDrawArray.splice(0, lineDrawArray.length);
        checkingInOneDirection(directionIndex, positionP);
        checkingInOneDirection(directionIndex + 1, positionP);
        if (currentCounter === winCounter) {
            setTimeout(function(){showResultScreen(false)},700);
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
            lineDrawArray.push( [ positionP[0], positionP[1] ] );
            lineDrawArray.push(newPosition);
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
        showResultScreen(true);
    }

}


function showResultScreen(isItADraw = false){
    // $('.gameBoardContainer').empty();
    // if (isItADraw){
    //     var message = $('<h2>', {'text': 'Game is a draw!'});
    //     drawVictories++
    // } else {
    //     var message = $('<h2>', {'text': currentPlayer.name + " has won!"});
    //     currentPlayer.victories++
    // }
    // $('.gameBoardContainer').append(message);
    // var resetButton = $('<button>', {class: 'resetButton', 'text': 'Play Again'});
    // $('.gameBoardContainer').append(resetButton);
    // $('.resetButton').click(resetGame)

}
