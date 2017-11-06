// Global variable for all cards
const cards = [
{revealed: false, html: "<h2>A</h2>"},
{revealed: false, html: "<h2>A</h2>"},
{revealed: false, html: "<h2>B</h2>"},
{revealed: false, html: "<h2>B</h2>"},
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

const revealCard = function(card) {
	$(card).toggle();
	$(card).siblings().toggle();
}

// Main
assignCards();

$('.card').children(':last-child').click(function() {
	revealCard(event.target);
});