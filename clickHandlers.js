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
    $(".setPlayerNameScreen").addClass("hidden").css('display', '');
    $(".preGameScreen").removeClass("hidden");
    firstSubmitClickHandler();
}
function choosePlayer2Name() {
    player2.name = $('.nameInput').val();
    $('.player2Name').text(player2.name);
    $(".setPlayerNameScreen").addClass("hidden").css('display', '');
    $('.waitingScreen').removeClass('hidden');
    ticTacToe.saveState({player2: {name: player2.name}})
    var waitTimer = setInterval(function(){if(boardSize){
        $('.waitingScreen').addClass('hidden');
        startGame();
        clearInterval(waitTimer);
    }}, 1000)
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
function chooseSquare(event){
    if(whoAmI.mark !== currentPlayer.mark) {
        return;
    }
    var clickedSquareText = $(event.currentTarget).find('.centerText');
    clickedSquareText.text(currentPlayer.mark);
    clickedSquareText.animate({'opacity':1},500);
    var clickedSquare = $(event.currentTarget);
    var column = clickedSquare.attr("column")
    var row = clickedSquare.parent().attr("row")
    clickedSquare.off("click");
    checkWinCondition([Number(row), Number(column)]);
    switchPlayer();
    saveGameData();
    displayStats();
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
