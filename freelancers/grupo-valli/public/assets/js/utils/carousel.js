var Carousel = (function(){

	var boxCarousel = $('.box-carousel'),
		carousel = $('.carousel'),
		totalItens = carousel.find('li').length,
		widthItemCarousel = boxCarousel.width(),
		widthCarousel = widthItemCarousel * totalItens;

		carousel.width(widthCarousel);
		carousel.find('li').width(widthItemCarousel);

	function Carousel(){

		$(window).resize(function(){
			widthItemCarousel = boxCarousel.width(),
			widthCarousel = widthItemCarousel * totalItens;

			carousel.width(widthCarousel);
			carousel.find('li').width(widthItemCarousel);
		});

		setInterval(function(){
			carousel.animate({
				'marginLeft' : -widthItemCarousel
			}, 800, function() {
				carousel.find('li').eq(0).clone().appendTo('.carousel');
				carousel.find('li').eq(0).remove();
				carousel.css('marginLeft', 0);
			});
		}, 5800);
	}

	return Carousel;
}());