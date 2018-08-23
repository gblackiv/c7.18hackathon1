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
var currentPlayer = player1;
var drawVictories = 0;
var winCounter;
var lineDrawArray = [];


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
