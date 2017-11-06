// Global variable for all cards
const cards = [
{revealed: false, html: "<h2>A</h2>", id: "card-one"},
{revealed: false, html: "<h2>A</h2>", id: "card-two"},
{revealed: false, html: "<h2>B</h2>", id: "card-three"},
{revealed: false, html: "<h2>B</h2>", id: "card-four"},
{revealed: false, html: "<h2>C</h2>"},
{revealed: false, html: "<h2>C</h2>"},
{revealed: false, html: "<h2>D</h2>"},
{revealed: false, html: "<h2>D</h2>"},
{revealed: false, html: "<h2>E</h2>"},
{revealed: false, html: "<h2>E</h2>"},
{revealed: false, html: "<h2>F</h2>"},
{revealed: false, html: "<h2>F</h2>"},
{revealed: false, html: "<h2>G</h2>"},
{revealed: false, html: "<h2>G</h2>"},
{revealed: false, html: "<h2>H</h2>"},
{revealed: false, html: "<h2>H</h2>"},
];

// Global variable for revealed cards
const revealedCards = [];

// Assign cards to the Game Area
const assignCards = function() {
	let card = $('.card').first();
	for (let i = 0; i < cards.length; i++) {
		card.children(':first-child').append(cards[i].html);
		card = card.next();
	}
}

// Flip the card over on the Game Area
const revealCard = function(card) {
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
	
}

// Main
assignCards();

$('.card').children(':last-child').click(function() {
	revealCard(event.target);
	addCard(event.target);
});