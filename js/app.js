// Global variable for all cards
const cards = [
{revealed: false, html: "<h2>A</h2>", id: "card-one"},
{revealed: false, html: "<h2>A</h2>", id: "card-two"},
{revealed: false, html: "<h2>B</h2>", id: "card-three"},
{revealed: false, html: "<h2>B</h2>", id: "card-four"},
{revealed: false, html: "<h2>C</h2>", id: "card-five"},
{revealed: false, html: "<h2>C</h2>", id: "card-six"},
{revealed: false, html: "<h2>D</h2>", id: "card-seven"},
{revealed: false, html: "<h2>D</h2>", id: "card-eight"},
{revealed: false, html: "<h2>E</h2>", id: "card-nine"},
{revealed: false, html: "<h2>E</h2>", id: "card-ten"},
{revealed: false, html: "<h2>F</h2>", id: "card-eleven"},
{revealed: false, html: "<h2>F</h2>", id: "card-twelve"},
{revealed: false, html: "<h2>G</h2>", id: "card-thirteen"},
{revealed: false, html: "<h2>G</h2>", id: "card-fourteen"},
{revealed: false, html: "<h2>H</h2>", id: "card-fifteen"},
{revealed: false, html: "<h2>H</h2>", id: "card-sixteen"}
];

// Global variable for revealed cards
let revealedCards = [];

// Global variable for correct pairs
let correctPairs = [];

// Assign cards to the Game Area
const assignCards = function() {
	let card = $('.card').first();
	for (let i = 0; i < cards.length; i++) {
		card.children(':first-child').append(cards[i].html);
		card = card.next();
	}
}

// Flip the card over on the Game Area
const flipCard = function(card) {
	$(card).toggle();
	$(card).siblings().toggle();
}

// Add revealed card to the revealed cards array
const addCard = function(card) {
	for (let i = 0; i < cards.length; i++) {
		if ($(card).parent().attr('id') == cards[i].id) {
			cards[i].revealed = true;
			revealedCards.push(cards[i].html)
		}
	}
}

// Check the revealed cards for matches
const checkCards = function() {
	if (revealedCards[0] === revealedCards[1]) {
		correctPairs.push(revealedCards);
	} else {
		for (let i = 0; i < cards.length; i++) {
			if ((revealedCards[0] === cards[i].html) && (cards[i].revealed === true)) {
				flipCard($('#' + cards[i].id).children(':first-child'));
				cards[i].revealed = false;
			} else if ((revealedCards[1] === cards[i].html) && (cards[i].revealed === true)) {
				flipCard($('#' + cards[i].id).children(':first-child'));
				cards[i].revealed = false;
			}
		}
	}
	revealedCards.splice(0);
}

const checkWin = function() {
	if (correctPairs.length === 8) {
		console.log("Congratulations, you're winner");
	}
}

// Main
assignCards();

$('.card-back').click(function() {
	flipCard(event.target);
	addCard(event.target);
	if (revealedCards.length > 1) {
		checkCards(event.target);
	}
	checkWin();
});