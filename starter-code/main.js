//declare variables
var cardTypes = ["king", "queen", "jack"];
var cardOptions = [];
var amountOfCards = 8;
var cards = [];
var cardsInPlay = [];
var moves = 0;

//get game board element
var gameBoard = document.getElementById("game-board");

//call create cards
createCards();


//function to create and randomize cards
function createCards() {
	//set card amount on input
	document.getElementById("card-amount").value = amountOfCards;

	//clear options, card values, and old cards from board -- for when a new game is started
	cardOptions = [];
	cards = [];
	gameBoard.innerHTML = "";
	moves = 0;

	//add options for cards based off of amount of cards in game
	var cardType = 0;
	//cycle through amount of cards in pairs and add even, or almost even amount of each type of card
	for (var x = 0; x < (amountOfCards / 2); x++) {
		if (cardType === cardTypes.length) {
			cardType = 0;
		}
		cardOptions.push(cardTypes[cardType]);
		cardOptions.push(cardTypes[cardType]);
		cardType++;
	}

	//set card values randomly
	for (var i = 0; i < amountOfCards; i++) {
		var cardIndex = Math.floor(Math.random() * cardOptions.length);
		cards.push(cardOptions[cardIndex]);
		cardOptions.splice(cardIndex, 1);
	}

	//create card elements
	for (var x = 0; x < cards.length; x++) {
		var card = document.createElement("div");
		card.className = "card";
		card.setAttribute("data-card", cards[x]);
		card.addEventListener("click", isTwoCards);
		gameBoard.appendChild(card);
	}
}

//check if two cards are flipped
function isTwoCards() {
	cardsInPlay.push(this.getAttribute("data-card"));
	this.className = "flipped card " + this.getAttribute("data-card");

	if (cardsInPlay.length === 2) {
		var match = isMatch();
		setTimeout(function () {
			clearCards(match);
		}, 500);
		cardsInPlay = [];
	}
}

//check if cards are matching
var isMatch = function () {
	moves++;
	return cardsInPlay[0] === cardsInPlay[1];
}

//handle outcome of when 2 cards are flipped
function clearCards(match) {
	var flippedCards = document.querySelectorAll(".flipped");
	for (var i = 0; i < flippedCards.length; i++) {
		if (match) {
			flippedCards[i].className = "card matched"
		} else {
			flippedCards[i].className = "card";
		}
	}
	checkComplete();
}

//check if game is complete
function checkComplete() {
	if (document.querySelectorAll(".matched").length === amountOfCards) {
		if (confirm("You Won in " + moves + " moves! Start new game?")) {
			createCards();
		}
	}
}

//change amount of cards on game board
function changeCardAmount() {
	var newAmount = Math.floor(document.getElementById("card-amount").value);
	console.log(newAmount % 2);
	if (!(newAmount % 2 === 0)) {
		newAmount -= 1;
		document.getElementById("card-amount").value = newAmount;
	}
	amountOfCards = newAmount;
	createCards();
}