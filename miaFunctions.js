$(document).ready(initializeApp)

function initializeApp() {
    if(isPlayer1Filled){
        $("#player1Start").hide();
    }
    $("#player1Start").click(startButtonFunction)
    $("#player2Join").click(joinButtonFunction)
}

function startButtonFunction(){
    whoAmI = player1;
    isPlayer1Filled = true;
    $("#player1Start").hide();
    $("#player2Join").hide();
    $(".setPlayerNameScreen").show();
    $(".player1").show();
    $('.gameBoardContainer').on('click', '.submitNameButton', choosePlayer1Name);
}

function joinButtonFunction(){
    whoAmI = player2;
    $("#player1Start").hide();
    $("#player2Join").hide();
    $(".setPlayerNameScreen").show();
    $(".player2").show();
    $('.gameBoardContainer').on('click', '.submitNameButton', choosePlayer2Name);
}

function choosePlayer1Name() {
    $('.gameBoardContainer').off('click');
    player1.name = $('.nameInput').val();
    $('.player1Name').text(player1.name);
    $('.nameInput').val("");
    $(".setPlayerNameScreen").addClass("hidden").css('display', '');
    $(".preGameScreen").removeClass("hidden");
    firstSubmitClickHandler();
}

function choosePlayer2Name() {
    player2.name = $('.nameInput').val();
    $('.player2Name').text(player2.name);
    $('.nameInput').val("");
    $(".setPlayerNameScreen").addClass("hidden").css('display', '');
    $(".preGameScreen").removeClass("hidden");
}

function firstSubmitClickHandler() {
    console.log("firstSubmitClickHandler")
    $('.gameBoardContainer').on('click', '.submitButton', recordFirstSubmitClick);
}

function recordFirstSubmitClick() {
    console.log("recordFirstSubmitClick")
    boardSize = parseInt($('.selectBoardSize option:selected').val());
    createWinConditionMenu(boardSize);
}

function displayStats() {
    $(".statusContainer > div:first-child").text(currentPlayer.name + " goes next.");
    $("#player1Wins").text(player1.victories);
    $("#player2Wins").text(player2.victories);
    $("#draws").text(drawVictories);
}

function resetGame() {
    $('.gameBoardContainer').empty();
    //do not clear boardSize for the moment because we want to keep the selection of boardSize the same
    currentGameBoard = [];
    booleanWinGame = 10;
    booleanDrawGame = 10;
    //call startGame() to create the square
    startGame(false);
    displayStats();
}
