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
	console.log('start click happened')
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

function startGameClickHandler(){
	$('body').on( 'click', '.submitButton', startGame.bind( boardSize, currentGameBoard ) );
}

function squareClickHandler(){
	$('.gameBoardContainer').on('click', $('.row > div'), chooseSquare);
}
function createWinConditionMenu(boardSizeP){
	$('gameBoardContainer').unbind('click', recordSubmitClick);
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