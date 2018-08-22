
//returns the currentGameBoard, so when called, you must assign to the global variable gameBoard variable
function startGame(boardSizeP, currentGameBoardP){
	for( let itterations = 0; itterations < boardSizeP; itterations++ ){
		for( let inner = 0; inner < boardSizeP; inner++ ){
			var newSquare = $( '<div>', {class: 'square'} );
			$(`.row::nth-child(${outter}`).append(newSquare);
			currentGameBoardP[outter][inner].push(newSquare);
		}
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
