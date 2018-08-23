$(document).ready(initializeApp)

function initializeApp() {
    chooseNameClickHandler();
}

function chooseNameClickHandler() {
    $('.gameBoardContainer').on('click', '.submitNameButton', choosePlayer1Name);
}

function choosePlayer1Name() {
    $('.gameBoardContainer').off('click');
    player1.name = $('.nameInput').val();
    $('.player1Name').text(player1.name);
    $('.nameInput').val("");
    $(".player1").addClass("hidden");
    $(".player2").removeClass("hidden");
    $('.gameBoardContainer').on('click', '.submitNameButton', choosePlayer2Name);
}

function choosePlayer2Name() {
    player2.name = $('.nameInput').val();
    $('.player2Name').text(player2.name);
    $('.nameInput').val("");
    $(".setPlayerNameScreen").addClass("hidden");
    $(".preGameScreen").removeClass("hidden");
    firstSubmitClickHandler();
}

function firstSubmitClickHandler() {
    $('.gameBoardContainer').on('click', '.submitButton', recordFirstSubmitClick);
}

function recordFirstSubmitClick() {
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