function switchPlayer(){
	console.log("switchPlayer")
	if( currentPlayer === player1 ){
		currentPlayer = player2;
	}
	else{
		currentPlayer = player1;
	}
}

//returns the currentGameBoard, so when called, you must assign to the global variable gameBoard variable
function startGame(){
	console.log('start click happened')
	for( let outter = 0; outter < boardSize; outter++ ){
		var newRow = $('<div>', {class: 'row', 'row': outter});
		currentGameBoard.push( [] );
		for( let inner = 0; inner < boardSize; inner++ ){
			var newSquare = $( '<div>', {class: 'square', 'column': inner} );
			newRow.append(newSquare);
			currentGameBoard[outter].push(newSquare);
		}
		$('.gameBoardContainer').append(newRow);
	}
	$('.preGameScreen').addClass('hidden');
	squareClickHandler();
	//var ticTacToe = new GenericFBModel('abc123xyz',boardUpdated);
	//saveGameData();
}

function startGameClickHandler(){
	console.log("startGameClickHandler")
	setTimeout(function(){$('body').on( 'click', '.submitButton', startGame)}, 200 );

}

function squareClickHandler(){
	$('.square').click(chooseSquare);
}
function createWinConditionMenu(boardSizeP){
	console.log("createWinConditionMenu")
	$('.gameBoardContainer').unbind('click', recordFirstSubmitClick);
	for( let createIndex = 3; createIndex <= boardSizeP; createIndex++ ){
		var newOption = $('<option>', {value: createIndex, text: createIndex});
		$('.selectWinningCounter').append(newOption);
	}
	$('span.submitText').addClass('hidden');
	$('span.startGameText').removeClass('hidden');
	$('.selectWinningCounter').removeClass('hidden');
	$('span.boardSizeSpan').addClass( 'hidden' );
	$('span.winningOptionSpan').removeClass( 'hidden' );
	$('.selectBoardSize').addClass( 'hidden' );
	startGameClickHandler();
}

//add the click handler to button to start game
//hide the boardSizeSpan, reveal winningOptionSpan
