function switchPlayer(){
	if( currentPlayer === player1 ){
		currentPlayer = player2;
	}
	else{
		currentPlayer = player1;
	}
}

//returns the currentGameBoard, so when called, you must assign to the global variable gameBoard variable
function startGame(boardSizeP, currentGameBoardP){
	for( let outter = 0; outter < boardSizeP; outter++ ){
		var newRow = $('<div>', {class: 'row', 'row': outter});
		currentGameBoardP.push( [] );
		for( let inner = 0; inner < boardSizeP; inner++ ){
			var newSquare = $( '<div>', {class: 'square', 'column': inner} );
			newRow.append(newSquare);
			currentGameBoardP[outter].push(newSquare);
		}
		$('.gameBoardContainer').append(newRow);
	}
	return currentGameBoardP;
}

function startGameClickHandler(){
	$('body').on( 'click', '.submitButton', startGame.bind( boardSize, currentGameBoard ) );
}

function squareClickHandler(){
	$('.square').click(chooseSquare);
}
