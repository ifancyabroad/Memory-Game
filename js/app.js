// Global variable for currently revealed cards
const revealedCards = [];

const card = {
	revealed: false,
	revealCard: function(position, html) {
		if (card.revealed === false) {
			position.toggle();
			position.siblings().toggle();
			revealedCards.push(html);
			card.revealed = true;
		}
	},
	hideCard: function() {
		if (this.revealed === true) {
			$(this).toggle();
			$(this).siblings().toggle();
			this.revealed = false;
		}
	}
}

const card1 = Object.create(card);
card1.html = "<h2>A</h2>";
card1.position = $('#card-one');

$('.card').children().click(function() {
	card1.revealCard(card1.position, card1.html);
});