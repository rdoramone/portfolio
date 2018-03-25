var Lightbox = (function(){
	
	var boxThumbs = $('.box-thumbs'),
		carousel = $('.carousel'),
		desCarousel = $('.description-carousel p'),
		btPrev = $('#prev'),
		btNext = $('#next'),
		totalItensCurrent = '',
		currentPosition = '',
		currentMarginLeft = '',
		newMarginLeft = '',
		widthList = '';

	function createLightBox(){
		boxThumbs.find('a').on('click', function(){
			var totalItens = $(this).parent().find('a').length,
				titleBusiness = $(this).parents('.box-business').children('.btn-accordion').text(),
				idx = $(this).index();

			for(var i = 0, max = totalItens; i < max; i++){
				var newSrcImage = $(this).parent().find('a').eq(i).children('img').attr('src').replace('thumbs/', '');
				carousel.append('<li><img src="' + newSrcImage + '" alt="Image ' + (i + 1) + '" title="Image ' + (i +1) + '" /></li>');
			}

			widthList = carousel.find('li').width();
			currentPosition = idx;
			totalItensCurrent = totalItens - 1;
			carousel.width(widthList * totalItens);
			carousel.css('marginLeft', -(widthList * idx));
			desCarousel.text(titleBusiness);
			hiddenButtons();
			$('.overlay, .lightbox').show();
		});

		btPrev.on('click', function(){
			currentMarginLeft = parseInt(carousel.css('marginLeft').replace('px', '')); 
			newMarginLeft = currentMarginLeft + widthList;

			if(!carousel.is(':animated')){
				carousel.animate({
					'marginLeft' : newMarginLeft
				}, 500);

				currentPosition--;
			}

			hiddenButtons();
		});	

		btNext.on('click', function(){
			currentMarginLeft = parseInt(carousel.css('marginLeft').replace('px', '')); 
			newMarginLeft = currentMarginLeft - widthList;
			
			if(!carousel.is(':animated')){
				carousel.animate({
					'marginLeft' : newMarginLeft
				}, 500);

				currentPosition++;
			}

			hiddenButtons();
		});

		$('#close, .overlay').on('click', function(){
			$('.overlay, .lightbox').hide(0, function(){
				carousel.find('li').remove();
				carousel.removeAttr('style');			
			});
		});
	}

	function hiddenButtons(){
		if(currentPosition == totalItensCurrent){
			btNext.css('display', 'none');
		}
		else{
			btNext.css('display', 'block');
		}

		if(currentPosition == 0){
			btPrev.css('display', 'none');
		}
		else{
			btPrev.css('display', 'block');
		}
	}

	return createLightBox;
}());