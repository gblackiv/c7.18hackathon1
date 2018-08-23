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

function drawLineAnimation(){

	lineDrawArray;
	var outter = 0;
	while( lineDrawArray.length > winCounter + 1){
		for( let inner = outter + 1; inner < lineDrawArray.length; inner++){
			if( lineDrawArray[outter][0] === lineDrawArray[inner][0] && 
					lineDrawArray[outter][1] === lineDrawArray[inner][1] ){
						lineDrawArray.splice( inner, 1);
						outter = 0;
					}
		}
		outter++;
	}
	var lineLength;
	if( winCounter === 3 ){

	}
	else if( winCounter === 4 ){

	}
	else{

	}
	var configObj = { css:{
		height: 100+'%',
		width: 1+'vw',
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		'max-height': 0,
		'background-color': 'firebrick',
		'class': 'drawnLine'
		}
	}
	var lineDiv = $('<div>', configObj);
	$('body').append(lineDiv);
	lineDiv.animate({'max-height': 200+'px'}, 1500);
}
