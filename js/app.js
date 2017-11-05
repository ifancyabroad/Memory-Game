$('.card-front').hide();

$('.card-front, .card-back').click(function() {
	$(this).toggle();
	$(this).siblings().toggle();
});