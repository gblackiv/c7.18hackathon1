$(document).ready(initializeApp)

function initializeApp() {
    firstSubmitClickHandler();
}

var boardSize = null;
var currentGameBoard = [];

function firstSubmitClickHandler() {
    $('.gameBoardContainer').on('click', '.submitButton', recordFirstSubmitClick);
}

function recordFirstSubmitClick() {
    boardSize = parseInt($('.selectBoardSize option:selected').val());
    createWinConditionMenu(boardSize);
}

function displayStats() {
$(".statusContainer > div:first-child").text(currentPlayer.name + "goes next.");
$("#player1Wins").text(player1.victories);
$("#player2Wins").text(player2.victories);
$("#draws").text(drawVictories);
}


function resetGame() {
    $('.gameBoardContainer').empty();
    //do not clear boardSize for the moment because we want to keep the selection of boardSize the same
    currentGameBoard = [];
    //call startGame() to create the square
    startGame();
    //set player
    switchPlayer();
    //clear statusDisplayArea
    var message = currentPlayer.name + "'s turn."
    handleStatusBar(message);
}
