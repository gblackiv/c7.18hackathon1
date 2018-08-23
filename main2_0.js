$(document).ready(initializeApp)

var boardSize = null;
var currentGameBoard = [];
var isPlayer1Filled = false;
var player1 = {
    name: 'Player 1',
    mark:'X',
    victories: 0
}
var player2 = {
    name: 'Player 2',
    mark:'O',
    victories: 0
}
var tempPlayer2Name = null;
var currentPlayer = player1;
var whoAmI = null;
var drawVictories = 0;
var winCounter;
var booleanWinGame = 10;
var booleanDrawGame = 10;
var booleanResetGame = 10;

var directionArray = [
    [-1,0], //up
    [1,0], //down
    [0,1], //right
    [0,-1], //left
    [-1,1], //up right
    [1,-1], //down left
    [-1,-1], //up left
    [1,1], //down right
]
var soundsObj = {bubblePop: new Sound('sounds/bubblePop.mp3'),
                    cheeringSound: new Sound('sounds/cheeringSound.mp3'),
                    sadTrumbone: new Sound('sounds/sadTrumbone.mp3'),
                    wrongBloop: new Sound('sounds/wrongBloop.wav')};
var ticTacToe;

function initializeApp() {
    ticTacToe = new GenericFBModel('abc123xyz', boardUpdated);
    if(isPlayer1Filled){
        $("#player1Start").hide();
    }

    $("#player1Start").click(startButtonFunction)
    $("#player2Join").click(joinButtonFunction)
}
function displayStats() {
    $(".statusContainer > div:first-child").text(currentPlayer.name + " goes next.");
    $('.player2Name').text(player2.name);
    $('.player1Name').text(player1.name);
    $("#player1Wins").text(player1.victories);
    $("#player2Wins").text(player2.victories);
    $("#draws").text(drawVictories);
}
var dots = window.setInterval(function () {
    if ($(".waitingScreen").hasClass("hidden")) {
        return;
    }
    var wait = document.getElementById("wait");
    if (wait.innerHTML.length > 3) {
        wait.innerHTML = "";
    } else {
        wait.innerHTML += "o";
    }
}, 700);

function showResultScreen(isItADraw = false) {
    $('.gameBoardContainer').empty();
    $(".statusContainer > div:first-child").text("Congratulations!");
    switchPlayer();
    if (isItADraw) {
        var message = $('<h2>', { 'text': 'Game is a draw!' });
        drawVictories++
    } else {
        var message = $('<h2>', {
            'text': currentPlayer.name + " has won!"});
        currentPlayer.victories++
    }
    $('.gameBoardContainer').append(message);
    var resetButton = $('<button>', { class: 'resetButton', 'text': 'Play Again' });
    $('.gameBoardContainer').append(resetButton);
    booleanResetGame = 11;
    $('.resetButton').click(saveGameData)
}
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
    saveGameData();
    displayStats();
}
function drawLineAnimation(){
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

	var squareHeightAndWidth = {left: currentGameBoard[1][1].offset().left - currentGameBoard[0][0].offset().left,
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

function replacePlayer2Name(){
    if (currentPlayer.mark === 'O'){
        player2.name = tempPlayer2Name
    }
    saveGameData();
    $('.square').unbind('mouseenter mouseleave');
}
