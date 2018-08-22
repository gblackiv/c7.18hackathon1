$(document).ready(initializeApp)
function initializeApp(){
    firstSubmitClickHandler();
}
var boardSize = null; //hardcode for now but will take in user input later
var currentGameBoard = [];

var firstClick = null;

function firstSubmitClickHandler() {
    $('.gameBoardContainer').on( 'click', '.submitButton', recordfFirstSubmitClick );
}

function recordfFirstSubmitClick() {
boardSize = $('.selectBoardSize option:selected').val();
createWinConditionMenu(boardSize);
}


