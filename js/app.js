// Global variable for all cards
const cards = [
{revealed: false, html: "<img src='images/pikachu.png' alt='Pikachu pokemon'>", id: "card-one"},
{revealed: false, html: "<img src='images/pikachu.png' alt='Pikachu pokemon'>", id: "card-two"},
{revealed: false, html: "<img src='images/squirtle.png' alt='Squirtle pokemon'>", id: "card-three"},
{revealed: false, html: "<img src='images/squirtle.png' alt='Squirtle pokemon'>", id: "card-four"},
{revealed: false, html: "<img src='images/meowth.png' alt='Meowth pokemon'>", id: "card-five"},
{revealed: false, html: "<img src='images/meowth.png' alt='Meowth pokemon'>", id: "card-six"},
{revealed: false, html: "<img src='images/vaporeon.png' alt='Vaporeon pokemon'>", id: "card-seven"},
{revealed: false, html: "<img src='images/vaporeon.png' alt='Vaporeon pokemon'>", id: "card-eight"},
{revealed: false, html: "<img src='images/moltres.png' alt='Moltres pokemon'>", id: "card-nine"},
{revealed: false, html: "<img src='images/moltres.png' alt='Moltres pokemon'>", id: "card-ten"},
{revealed: false, html: "<img src='images/jigglypuff.png' alt='Jigglypuff pokemon'>", id: "card-eleven"},
{revealed: false, html: "<img src='images/jigglypuff.png' alt='Jigglypuff pokemon'>", id: "card-twelve"},
{revealed: false, html: "<img src='images/lapras.png' alt='Lapras pokemon'>", id: "card-thirteen"},
{revealed: false, html: "<img src='images/lapras.png' alt='Lapras pokemon'>", id: "card-fourteen"},
{revealed: false, html: "<img src='images/dragonite.png' alt='Dragonite pokemon'>", id: "card-fifteen"},
{revealed: false, html: "<img src='images/dragonite.png' alt='Dragonite pokemon'>", id: "card-sixteen"}
];

// Global variable for revealed cards
let revealedCards = [];

// Global variable for correct pairs
let correctPairs = [];

// Global variables for move counter
let moveCounter = 0;
const t = $('.counter').text();

// Global variables for timer
let minutes = 0;
let seconds = 0;
let mSeconds = 0;
let time;

// Update screen with move counter
const updateCounter = function() {
	$('.counter').text(t + moveCounter);
}

// Update star rating
const updateStar = function() {
	if (moveCounter >= 10 && moveCounter % 5 === 0) {
		let stars = $('.star-rating').children();
		let currentStar;
		for (let i = stars.length; i >= 0; i--) {
			if ($(stars[i]).attr('class') === 'fa fa-star') {
				currentStar = $(stars[i]);
				currentStar.attr('class', 'fa fa-star-half-o');
				break;
			}
			else if ($(stars[i]).attr('class') === 'fa fa-star-half-o') {
				currentStar = $(stars[i]);
				currentStar.attr('class', 'fa fa-star-o');
				break;
			}
		}
	}
}

// Reset star rating
const resetStars = function() {
	let stars = $('.star-rating').children();
	for (let star of stars) {
		$(star).attr('class', 'fa fa-star');
	}
}

// Timer
const timer = function() {
	mSeconds++
	if (mSeconds >= 100) {
		seconds++
		mSeconds = 0;
		if (seconds >= 60) {
			minutes++
			seconds = 0;
		}	
	}
	
	$('.timer').text((minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + ":" + (mSeconds > 9 ? mSeconds : "0" + mSeconds));

	startTimer();
}

// Start the timer
const startTimer = function() {
	time = setTimeout(timer, 10);
}

// Reset the timer
const resetTimer = function() {
	$('.timer').text('00:00:00');
	minutes = 0;
	seconds = 0;
	mSeconds = 0;
}

// Stop the timer
const stopTimer = function() {
	clearTimeout(time);
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
	moveCounter = 0;
	updateCounter();
	resetStars();
	correctPairs.splice(0);
	revealedCards.splice(0);
	$('.game-area').empty();
	cards.forEach(function(card) {
		card.revealed = false;
	});
	resetTimer();
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
		stopTimer();
		const youWin = 
		`<div class="modal">
			<div class="popup">
				<h2>Congratulations!</h2>
				<img src="images/winner.gif" alt="Pikachu and Eevee high five each other and wave">
				<p class="star-rating">` + $('.star-rating').html() + `</p>
				<p>` + $('.timer').text() + `</p>
				<button type="button" class="play">Play Again</button>
			</div>
		</div>`
		$('body').append(youWin);
	}
}

// Main
shuffle(cards);
assignCards();
updateCounter();

// Play again after winning
$('body').on('click', '.play', function() {
	$('.modal').remove();
	resetGame();
	shuffle(cards);
	assignCards();
});

// Reset the game
$('.reset').click(function() {
	stopTimer();
	resetGame();
	shuffle(cards);
	assignCards();
});

// Flip a card
$('.game-area').on('click', '.card-back', function() {
	flipCard(event.target);
	addCard(event.target);
	if (revealedCards.length > 1) {
		moveCounter++;
		updateCounter();
		updateStar();
		checkCards(event.target);
		checkWin();
	}
	if (moveCounter === 0) {
		startTimer();
	}
});