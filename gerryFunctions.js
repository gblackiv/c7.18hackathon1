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
	// var cssTextSize = 59.6 / boardSize;
	var cssTextSize = 47.58/ boardSize;
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
			})
			var newCenterText = $('<div>', {
				class: 'centerText',
			})
			newSquare.append(newCenterText);
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


var squareHeightAndWidth
function drawLineAnimation(){
	// var outter = 0;
	// while( lineDrawArray.length > winCounter ){
	// 	for( let inner = outter + 1; inner < lineDrawArray.length; inner++){
	// 		if( lineDrawArray[outter][0] === lineDrawArray[inner][0] && 
	// 				lineDrawArray[outter][1] === lineDrawArray[inner][1] ){
	// 					lineDrawArray.splice( inner, 1);
	// 					outter = 0;
	// 				}
	// 	}
	// 	outter++;
	//}
		//removes duplicates
	for( let outter = 0; outter < lineDrawArray.length - 1; outter++ ){
		for( let inner = 1; inner < lineDrawArray.length; inner++ ){
			if(lineDrawArray[outter][0] === lineDrawArray[inner][0] && lineDrawArray[outter][1] === lineDrawArray[inner][1] ){
				lineDrawArray.splice(inner, 1);
			}
		}
	}	

	//sorts array
	for( let outter = 0; outter < lineDrawArray.length; outter++ ){
		for( let inner = 0; inner < lineDrawArray.length - 1; inner++ ){
			if( lineDrawArray[inner][0] > lineDrawArray[inner + 1][0] ){
				var temp = lineDrawArray.splice(inner, 1);
				lineDrawArray.splice(inner + 1, 0 ,temp[0]);
				outter = 0;
			}
		}
	}
	for( let outter = 0; outter < lineDrawArray.length; outter++ ){
		for( let inner = 0; inner < lineDrawArray.length - 1; inner++ ){
			if( lineDrawArray[inner][1] > lineDrawArray[inner + 1][1] ){
				var temp = lineDrawArray.splice(inner, 1);
				lineDrawArray.splice(inner + 1, 0 ,temp[0]);
				outter = 0;
			}
		}
	}
	var linelength = currentGameBoard[0][0].width() * winCounter;
	if(lineDrawArray[0][0] === lineDrawArray[1][0] ){
		var lineRotation = -90;
	}
	else if(lineDrawArray[0][0] < lineDrawArray[1][0] && lineDrawArray[0][1] < lineDrawArray[1][1]){
		var lineRotation = -45;
		linelength*=1.5;
	}
	else if(lineDrawArray[0][0] > lineDrawArray[1][0] && lineDrawArray[0][1] < lineDrawArray[1][1]){
		var lineRotation = -135;
		linelength*=1.5;
	}
	else if(lineDrawArray[0][1] === lineDrawArray[1][1]){
		var lineRotation = 0;
	}

	var xStart = ($('.gameBoardContainer').width() / boardSize) / 2;
	var yStart = ($('.gameBoardContainer').height() / boardSize) / 2;

	squareHeightAndWidth = {left: currentGameBoard[1][1].offset().left - currentGameBoard[0][0].offset().left,
							top: currentGameBoard[1][1].offset().top - currentGameBoard[0][0].offset().top};
	var midHeightAndWidth = {left: squareHeightAndWidth.left / 2, top: squareHeightAndWidth.top / 2};
	var configObj = {'class': 'drawnLine', css:{
											height: 100+'%',
											width: 0.5+'vw',
											position: 'absolute',
											transform: `rotate(${lineRotation}deg)`,
											left: xStart + (lineDrawArray[0][1] * (xStart * 2)),
											top: yStart + (lineDrawArray[0][0] * (yStart * 2)),
											'max-height': 0,
											'background-color': 'lightgrey',
											'z-index': 10
											}
	}
	var lineDiv = $('<div>', configObj);
	$('.gameBoardContainer').append(lineDiv);
	lineDiv.animate({'max-height': `${linelength}px`}, 1500);
}

