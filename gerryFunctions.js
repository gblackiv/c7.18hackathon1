
//returns the currentGameBoard, so when called, you must assign to the global variable gameBoard variable
function startGame(boardSizeP, currentGameBoardP){
	for( let outter = 0; outter < boardSizeP; outter++ ){
		var newRow = $('<div>', {class: 'row'});
		currentGameBoardP.push( [] );
		for( let inner = 0; inner < boardSizeP; inner++ ){
			var newSquare = $( '<div>', {class: 'square'} );
			newRow.append(newSquare);
			currentGameBoardP[outter].push(newSquare);
		}
		$('.gameBoardContainer').append(newRow);
	}
	return currentGameBoardP;
}

function switchPlayer(currentPlayerP){
	if( currentPlayerP === player1 ){
		currentPlayerP = player2;
	}
	else{
		currentPlayerP = player1;
	}
	return currentPlayerP;
}

function squareClickHandler(){
	$('.gameBoardContainer').on('click', $('.row > div'), chooseSquare)
}
