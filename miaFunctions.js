$(document).ready(initializeApp)

function initializeApp() {
    firstSubmitClickHandler();
}
var boardSize = null; //hardcode for now but will take in user input later
var currentGameBoard = [];

var firstClick = null;

function firstSubmitClickHandler() {
    $('.gameBoardContainer').on('click', '.submitButton', recordFirstSubmitClick);
}

function recordFirstSubmitClick() {
    boardSize = parseInt($('.selectBoardSize option:selected').val());
    createWinConditionMenu(boardSize);
}

function resetGame() {
    //do not clear boardSize for the moment because we want to keep the selection of boardSize the same
    currentGameBoard = [];
    //call startGame() to create the square
    startGame();
    //set player
    switchPlayer();
    //clear statusDisplayArea
    var message = currentPlayer.name + "'s Turn"
    handleStatusBar(message);
}
