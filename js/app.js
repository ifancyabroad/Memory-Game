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

// Global variables for move counter
let moveCounter = 0;
const t = $('#counter').text();

// Increment move counter and update screen
const incCounter = function() {
	moveCounter++;
	$('#counter').text(t + moveCounter);
}

// Shuffle function from http://stackoverflow.com/a/2450976
const shuffle = function(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Reset game
const resetGame = function() {
	correctPairs.splice(0);
	revealedCards.splice(0);
	$('.game-area').empty();
	cards.forEach(function(card) {
		card.revealed = false;
	});
}

// Assign cards to the Game Area
const assignCards = function() {
	for (let i = 0; i < cards.length; i++) {
		$('.game-area').append(
		`<div class="card" id="` + cards[i].id + `">
			<div class="card-front">` + 
				cards[i].html + 
			`</div>
			<div class="card-back">
			</div>
		</div>`);
	}
}

// Flip the card over on the Game Area
const flipCard = function(card) {
	$(card).parent().toggleClass('flipped');
}

// Shake animation for incorrect guesses
const shakeCard = function(card) {
	$(card).parent().animate({left: '+=10px'}, 50);
    $(card).parent().animate({left: '-=20px'}, 75);
    $(card).parent().animate({left: '+=20px'}, 75);
	$(card).parent().animate({left: '-=20px'}, 75);
    $(card).parent().animate({left: '+=20px'}, 75);
    $(card).parent().animate({left: '-=10px'}, 50);
	}

// Add revealed card to the revealed cards array
const addCard = function(card) {
	for (let i = 0; i < cards.length; i++) {
		if ($(card).parent().attr('id') === cards[i].id) {
			cards[i].revealed = true;
			revealedCards.push(cards[i].html)
		}
	}
}

// Check the revealed cards for matches
const checkCards = function() {
	if (revealedCards[0] === revealedCards[1]) {
		correctPairs.push(revealedCards[0]);
	} else {
		for (let i = 0; i < cards.length; i++) {
			if ((revealedCards[0] === cards[i].html) && (cards[i].revealed === true)) {
				setTimeout(flipCard, 1000, ($('#' + cards[i].id).children(':first-child')));
				cards[i].revealed = false;
			} else if ((revealedCards[1] === cards[i].html) && (cards[i].revealed === true)) {
				setTimeout(shakeCard, 400, ($('#' + cards[i].id).children(':first-child')));
				setTimeout(flipCard, 1000, ($('#' + cards[i].id).children(':first-child')));
				cards[i].revealed = false;
			}
		}
	}
	revealedCards.splice(0);
}

// Check if all cards are correct pairs
const checkWin = function() {
	if (correctPairs.length === 8) {
		const youWin = `<div class="modal">
							<div class="popup">
								<h1>You're Winner</h1>
								<button type="button" class="play">Play Again</button>
							</div>
						</div>`
		$('body').append(youWin);
	}
}

// Main
shuffle(cards);
assignCards();

$('body').on('click', '.play', function() {
	$('.modal').remove();
	resetGame();
	shuffle(cards);
	assignCards();
});

$('.game-area').on('click', '.card-back', function() {
	flipCard(event.target);
	addCard(event.target);
	if (revealedCards.length > 1) {
		incCounter();
		checkCards(event.target);
	}
	checkWin();
});