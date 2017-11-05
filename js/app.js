const card = {
	revealed: false,
	picture: 1,
	flipCard: function() {
		$(this).toggle();
		$(this).siblings().toggle();
		if (this.revealed === false) {
			this.revealed = true;
		} else {
			this.revealed = false;
		}
	}
}

$('.card-front, .card-back').click(card.flipCard);