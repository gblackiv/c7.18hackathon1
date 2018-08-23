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

function replacePlayer2Name(){
    if (currentPlayer.mark === 'O'){
        player2.name = tempPlayer2Name
    }
    saveGameData();
    $('.square').unbind('mouseenter mouseleave');
}
