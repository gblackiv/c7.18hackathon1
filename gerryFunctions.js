function switchPlayer(currentPlayerP){
	if( currentPlayerP === player1 ){
		currentPlayerP = player2;
	}
	else{
		currentPlayerP = player1;
	}
	return currentPlayerP;
}