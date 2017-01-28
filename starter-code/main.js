var cardOne = "queen";
var cardTwo = "king";
var cardThree = "queen";
var cardFour = "king";

var gameBoard = document.getElementById("game-board");
createCards();

function createCards() {
	for (var x = 0; x < 4; x++) {
		var card = document.createElement("div");
		card.className = "card";
		gameBoard.appendChild(card);
	}
}