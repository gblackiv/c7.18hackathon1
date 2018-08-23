function switchPlayer() {
	if (currentPlayer === player1) {
		currentPlayer = player2;
	} else {
		currentPlayer = player1;
	}
}

//returns the currentGameBoard, so when called, you must assign to the global variable gameBoard variable
function startGame(notResetGame = true) {
	displayStats();
	if (notResetGame) {
		winCounter = (parseInt($('.selectWinningCounter option:selected').val())) - 1;
	}
	var cssSize = 93 / boardSize;
	var cssTextSize = 59.6/ boardSize;
	var cssMargin = 7 / (boardSize + 1);
	for (let outter = 0; outter < boardSize; outter++) {
		var newRow = $('<div>', {
			class: 'row',
			'row': outter,
			css: {
				'height': cssSize + '%'
			}
		});
		currentGameBoard.push([]);

		for (let inner = 0; inner < boardSize; inner++) {
			var newSquare = $('<div>', {
				class: 'square',
				'column': inner,
				css: {
					'width': cssSize + '%',
					'font-size': cssTextSize + 'vh',
					'margin-top': cssMargin + '%',
					'margin-left': cssMargin + '%',
					color: "white"
				}
			});
			newRow.append(newSquare);
			currentGameBoard[outter].push(newSquare);
		}
		$('.gameBoardContainer').append(newRow);
	}
	$('.preGameScreen').addClass('hidden');
	squareClickHandler();
}

function startGameClickHandler() {
	setTimeout(function () {
		$('body').on('click', '.submitButton', startGame)
	}, 200);

}

function squareClickHandler() {
	$('.square').click(chooseSquare);
}

function createWinConditionMenu(boardSizeP) {
	$('.gameBoardContainer').off('click');
	for (let createIndex = 3; createIndex <= boardSizeP; createIndex++) {
		var newOption = $('<option>', {
			value: createIndex,
			text: createIndex
		});
		$('.selectWinningCounter').append(newOption);
	}
	$('span.submitText').addClass('hidden');
	$('span.startGameText').removeClass('hidden');
	$('.selectWinningCounter').removeClass('hidden');
	$('span.boardSizeSpan').addClass('hidden');
	$('span.winningOptionSpan').removeClass('hidden');
	$('.selectBoardSize').addClass('hidden');
	startGameClickHandler();

}
// function handleStatusBar( message ){
// 	$('')
// }
var squareOffset;
var squareHeightAndWidth
function drawLineAnimation(){
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

	// var midSquareHeight = Math.abs((currentGameBoard[lineDrawArray[0][0]][lineDrawArray[0][1]].position().top - currentGameBoard[lineDrawArray[lineDrawArray.length - 1][0]][lineDrawArray[lineDrawArray.length - 1][1]].offset().top)/2);
	//var midSquareHeight = currentGameBoard[lineDrawArray[0][0]].css('height');
	
	squareOffset = currentGameBoard[0][0].offset();
	squareHeightAndWidth = {left: currentGameBoard[1][1].offset().left - currentGameBoard[0][0].offset().left,
							top: currentGameBoard[1][1].offset().top - currentGameBoard[0][0].offset().top};
	var lineCenter = {left: squareHeightAndWidth.left * boardSize / 2,
						right: squareHeightAndWidth.top * boardSize / 2};
	
	var lineLength = (currentGameBoard[1][1].offset().left - currentGameBoard[0][0].offset().left  ) * boardSize;
	var configObj = { css:{
		height: 100+'%',
		width: 1+'vw',
		position: 'absolute',
		left: '50%',
		top: '50%',
		'max-height': 0,
		'background-color': 'firebrick',
		'class': 'drawnLine',
		'z-index': 10
		}
	}
	var lineDiv = $('<div>', configObj);
	$('.gameBoardContainer').append(lineDiv);
	// currentGameBoard[lineDrawArray[lineDrawArray.length - 1][0]][lineDrawArray[lineDrawArray.length-1][1]].append(lineDiv);
	lineDiv.animate({'max-height': lineLength+'px'}, 1500);
}

