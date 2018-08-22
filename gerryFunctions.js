function switchPlayer(){
	if( currentPlayer === player1 ){
		currentPlayer = player2;
	}
	else{
		currentPlayer = player1;
	}
}

//returns the currentGameBoard, so when called, you must assign to the global variable gameBoard variable
function startGame(notResetGame = true){
	if(notResetGame){
		winCounter = (parseInt($('.selectWinningCounter option:selected').val()))-1;
	}
		var cssSize = 100 / boardSize;
		var cssTextSize = 55 / boardSize ;
	for( let outter = 0; outter < boardSize; outter++ ){
		var newRow = $('<div>', {class: 'row', 'row': outter, css: {'height': cssSize+'%' }});
		currentGameBoard.push( [] );

		for( let inner = 0; inner < boardSize; inner++ ){
			var newSquare = $( '<div>', {class: 'square', 'column': inner , css: {'width': cssSize+'%','font-size': cssTextSize+'vh' }} );
			newRow.append(newSquare);
			currentGameBoard[outter].push(newSquare);
		}
		$('.gameBoardContainer').append(newRow);
	}
	$('.preGameScreen').addClass('hidden');
	squareClickHandler();
}

function startGameClickHandler(){
	setTimeout(function(){$('body').on( 'click', '.submitButton', startGame)}, 200 );
	
}

function squareClickHandler(){
	$('.square').click(chooseSquare);
}
function createWinConditionMenu(boardSizeP){
	$('.gameBoardContainer').off('click');
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
// function handleStatusBar( message ){
// 	$('')
// }
