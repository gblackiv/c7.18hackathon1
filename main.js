var player1 = 'X';
var player2 = 'O';
var currentPlayer = player1;

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