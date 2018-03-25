//VERIFICAR O SCRIPT POIS EXISTEM COMENTÁRIOS DE PENDÊNCIAS.
//CARROSSEL PRECISA DO AJUSTE DE CLIQUE NA IMAGEM PARA IR DIRETO PARA A SUA IMAGE/VIDEO E DESCRIÇÃO
function catchEvent(eventObj, event, eventHandler){
	if(eventObj.addEventListener){
		eventObj.addEventListener(event, eventHandler, false);
	}
	else if(eventObj.attachEvent){
		event = "on" + event;
		eventObj.attachEvent(event, eventHandler);
	}
}
catchEvent(window, 'load', setupEvents);
function setupEvents(evnt){
	catchEvent(document.getElementById('bt-indicate'), 'click', showLightbox);
	catchEvent(document.getElementById('lightbox-register').getElementsByTagName('a')[0], 'click', hideLightbox);
	catchEvent(document.getElementById('bg-lightbox'), 'click', hideLightbox);
	catchEvent(document.getElementById('codArea'), 'change', mask);
	catchEvent(document.getElementById('numPhone'), 'change', mask);
	catchEvent(document.getElementById('register'), 'submit', validateFormMobile);
	catchEvent(document.getElementById('registered'), 'submit', validateFormFixed);
}
function showLightbox(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var bgLightbox = document.getElementById('bg-lightbox');
	var lightboxRegister = document.getElementById('lightbox-register');
	var divideWindowHeight = window.outerHeight / 2;
	var divideWindowWidth = window.outerWidth / 2;
	//FALTA FAZER UM TRATAMENTO COM O MÉTODO getComputedStyle PARA QUE FUNCIONE TANTO NO IE8 COMO NOS DEMAIS NAVEGADORES.
	var lightboxHeight = parseInt(getComputedStyle(lightboxRegister).getPropertyValue('height').replace('px', '')) / 2;
	var lightboxWidth = parseInt(getComputedStyle(lightboxRegister).getPropertyValue('width').replace('px', '')) / 2;
	var windowHeight = document.documentElement.clientHeight;
	var windowWidth = document.documentElement.clientWidth;
	bgLightbox.style.display = 'block';
	bgLightbox.style.height = windowHeight + 'px';
	bgLightbox.style.width = windowWidth + 'px';
	lightboxRegister.style.display = 'block';
	lightboxRegister.style.top = ((windowHeight / 2) - lightboxHeight) + 'px';
	lightboxRegister.style.left = ((windowWidth / 2) - lightboxWidth) + 'px';
}
function hideLightbox(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var bgLightbox = document.getElementById('bg-lightbox');
	var lightboxRegister = document.getElementById('lightbox-register');
	bgLightbox.style.display = 'none';
	lightboxRegister.style.display = 'none';
}
function mask(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
		target.value = target.value.replace(/[\(\)]/g,'');
	var txtInput = target.value;
	var maskCodeArea = txtInput.replace(txtInput , '(' + txtInput + ')');
	//FALTA FAZER UM TRATAMENTO PARA RECEBER 8 OU 9 DIGÍTOS, POIS COMO ESTÁ HOJE NÃO ESTÁ RECEBENDO O NONO DIGÍTO CASO JÁ TENHA 8 NO CAMPO.
	var maskPhone = txtInput.replace(/([0-9]{4,5})([0-9]{4})/ , "$1-$2");

	if(target == document.getElementById('codArea')){
		if(target.value && target.value.length == 2){
			return target.value = maskCodeArea;
		} else {
			return target.value = '';
		}
	}
	else if(target == document.getElementById('numPhone')){
		if(target.value && target.value.length >= 8 && target.value.length <= 10){
			return target.value = maskPhone;
		} else {
			return target.value = '';
		}
	}
}
function validateFormMobile(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var codArea = document.getElementById('codArea');
	var numPhone = document.getElementById('numPhone');
	var msgErro = document.getElementById('msg-error');
	var codAreaRegex = new RegExp('\([0-9]{2}\)');
	var codAreaOk = codAreaRegex.test(codArea.value);
	var numPhoneRegex = new RegExp('([0-9]{5})\-([0-9]{4})');
	var numPhoneOk = numPhoneRegex.test(numPhone.value);

	if(codAreaOk && numPhoneOk){
		alert("Enviado com sucesso!!");
	}
	else if(!codAreaOk && numPhoneOk){
		theEvent.preventDefault();
		msgErro.style.visibility = 'visible';
		codArea.setAttribute('class', 'field-error');
		codArea.focus();
	}
	else if(codAreaOk && !numPhoneOk){
		theEvent.preventDefault();
		msgErro.style.visibility = 'visible';
		numPhone.setAttribute('class', 'field-error');
		numPhone.focus();
	}
	else if(!codAreaOk && !numPhoneOk){
		theEvent.preventDefault();
		msgErro.style.visibility = 'visible';
		codArea.setAttribute('class', 'field-error');
		numPhone.setAttribute('class', 'field-error');
		codArea.focus();
	}
}
function validateFormFixed(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var email = document.getElementById('email');
	var emailRegex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{4}', 'gi');
	var emailOk = emailRegex.test(email.value);

	if(emailOk){
		alert("E-mail Enviado com sucesso!!");
	}
	else{
		theEvent.preventDefault();
		email.setAttribute('class', 'field-error');
		email.focus();
	}
}
function justNum(){
    var tecla = window.event ? event.keyCode : event.which;
    if(tecla > 47 && tecla < 58){
    	return true;
    } 
    else{
    	if (tecla == 8 || tecla == 0){
    		return true;
    	} 
		else{
			return false;
		}  
    }
}
function animateWheelchair(){
	var wheelchair = document.getElementById('wheelchair');
	wheelchair.style.animation = 'wheelchair 5s 1';
	wheelchair.style.WebkitAnimation = 'wheelchair 5s 1';
}
function animateBook(){
	var book = document.getElementById('book');
	book.style.animation = 'book 5s 1';
	book.style.WebkitAnimation = 'book 5s 1';
}
function animatePlantOneSheet(){
	var plantOneSheet = document.getElementById('plant-one-sheet');
	plantOneSheet.style.animation = 'plantOneSheet 5s 1';
	plantOneSheet.style.WebkitAnimation = 'plantOneSheet 5s 1';
}
function animateHeart(){
	var heart = document.getElementById('heart');
	heart.style.animation = 'heart 5s 1';
	heart.style.WebkitAnimation = 'heart 5s 1';
}
function animateStalkHeart(){
	var stalkHeart = document.getElementById('stalk-heart');
	stalkHeart.style.animation = 'stalkHeart 5s 1';
	stalkHeart.style.WebkitAnimation = 'stalkHeart 5s 1';
}
function animateVivinho(){
	var vivinho = document.getElementById('vivinho');
	vivinho.style.animation = 'vivinho 6s 1';
	vivinho.style.WebkitAnimation = 'vivinho 6s 1';
	vivinho.className = 'vivinho-crossbrowser';
}
function animatePlantSpiral(){
	var plantSpiral = document.getElementById('plant-spiral');
	plantSpiral.style.animation = 'plantSpiral 6s 1';
	plantSpiral.style.WebkitAnimation = 'plantSpiral 6s 1';
}
function animateSheetLeft(){
	var sheetLeft = document.getElementById('sheet-left');
	sheetLeft.style.animation = 'sheetLeft 5s 1';
	sheetLeft.style.WebkitAnimation = 'sheetLeft 5s 1';
}
function animateSheetRight(){
	var sheetRight = document.getElementById('sheet-right');
	sheetRight.style.animation = 'sheetRight 5s 1';
	sheetRight.style.WebkitAnimation = 'sheetRight 5s 1';
}
function animateBallons(){
	var boxTopLeft = document.getElementById('box-top-left');
	var boxBottomLeft = document.getElementById('box-bottom-left');
	var boxTopRight = document.getElementById('box-top-right');
	boxTopLeft.style.animation = 'ballonAnimated 1s 1';
	boxTopLeft.style.WebkitAnimation = 'ballonAnimated 1s 1';
	boxBottomLeft.style.animation = 'ballonAnimated 1s 1';
	boxBottomLeft.style.WebkitAnimation = 'ballonAnimated 1s 1';
	boxTopRight.style.animation = 'ballonAnimated 1s 1';
	boxTopRight.style.WebkitAnimation = 'ballonAnimated 1s 1';
}
$(function(){
/* CARROSSEL PHOTO */
	var itemWidth = parseInt($('.thumbs li').outerWidth(true));
	var numItensThumbs = $('.thumbs li').length;
	var widthMask = $('.mask-thumbs').width();
	var btPrev = $('.btPrev');
	var btNext = $('.btNext');
	var widthThumb = 0;
	var j = 0;
	var k = 1;
	var l = 0;

	$('.thumbs').css({
		'width': itemWidth * numItensThumbs + 'px',
		'left': 0	
	});

	for(var i = 4; i <= numItensThumbs; i++){
		if(i % 4 == 0){
			$('.thumbs li').eq(i - 1).addClass('last');
			$('.thumbs li').eq(i).addClass('first');
		};
	}

	btPrev.click(function(e){
		e.preventDefault();
		$('.thumbs li').removeClass('active').eq(k).addClass('active');
		$('.box-photo ul li').eq(j).css('display','none');
		$('.box-photo ul li').eq(k).fadeIn(400);
		$('.box-txt-description ul li').eq(j).css('display','none');
		$('.box-txt-description ul li').eq(k).fadeIn(400);

		if($('.thumbs li').eq(1)){
			btNext.show();
		}		

		if(k % 4 == 0){
			l++;
			widthThumb = -(widthMask * l);

			$('.thumbs').animate({
				left: widthThumb + 'px'
			});
		}

		if(k == numItensThumbs -1){
			btPrev.hide();
		}

		j++;
		k++;
	});

	btNext.click(function(e){
		e.preventDefault();
		j--;
		k--;

		$('.thumbs li').removeClass('active').eq(j).addClass('active');
		$('.box-photo ul li').eq(k).css('display','none');
		$('.box-photo ul li').eq(j).fadeIn(400);
		$('.box-txt-description ul li').eq(k).css('display','none');
		$('.box-txt-description ul li').eq(j).fadeIn(400);

		if(k % 4 == 0){
			l--;
			widthThumb = (widthThumb + widthMask) * l;

			$('.thumbs').animate({
				left: widthThumb + 'px'
			});
		}

		if(k == 1){
			btNext.hide();
		}
		
		if(k <= numItensThumbs -1){
			btPrev.show();
		}
	});
/* CARROSSEL VIDEO */
	var videoWidth = parseInt($('.thumbs-video li').outerWidth(true));
	var numVideoThumbs = $('.thumbs-video li').length;
	var widthMaskVideo = $('.mask-thumbs-video').width();
	var btPrevVideo = $('.btPrevVideo');
	var btNextVideo = $('.btNextVideo');
	var widthThumbVideos = 0;
	var n = 0;
	var o = 1;
	var p = 0;

	$('.thumbs-video').css({
		'width': videoWidth * numVideoThumbs + 'px',
		'left': 0	
	});

	for(var m = 3; m <= numVideoThumbs; m++){
		if(m % 3 == 0){
			$('.thumbs-video li').eq(m - 1).addClass('last');
			$('.thumbs-video li').eq(m).addClass('first');
		};
	}

	btPrevVideo.click(function(e){
		e.preventDefault();
		$('.thumbs-video li').removeClass('active').eq(o).addClass('active');
		$('.box-video ul li').eq(n).css('display','none');
		$('.box-video ul li').eq(o).fadeIn(400);

		if($('.thumbs-video li').eq(1)){
			btNextVideo.show();
		}		

		if(o % 3 == 0){
			p++;
			widthThumbVideos = -(widthMaskVideo * p);

			$('.thumbs-video').animate({
				left: widthThumbVideos + 'px'
			});
		}

		if(o == numVideoThumbs -1){
			btPrevVideo.hide();
		}

		n++;
		o++;
	});

	btNextVideo.click(function(e){
		e.preventDefault();
		n--;
		o--;

		$('.thumbs-video li').removeClass('active').eq(n).addClass('active');
		$('.box-video ul li').eq(o).css('display','none');
		$('.box-video ul li').eq(n).fadeIn(400);

		if(o % 3 == 0){
			p--;
			widthThumbVideos = (widthThumbVideos + widthMaskVideo) * p;
			$('.thumbs-video').animate({
				left: widthThumbVideos + 'px'
			});
		}
		if(o == 1){
			btNextVideo.hide();
		}
		if(o <= numVideoThumbs -1){
			btPrevVideo.show();
		}
	});
/* PERCENTAGE BAR */
	var barCollection = $('.bar-collection').length;
	for(var i = 0; i < barCollection; i++){
		var percent = parseInt($('.ballon-percent').eq(i).text());
		var valuePercent = (2.46 * percent) + 'px';
		$('.percentage-bar').eq(i).css('width', valuePercent);
		$('.box-ballon-percent').eq(i).css('left', valuePercent);
	}
	$('.wheelchair, .book, .plant-one-sheet, .heart, .stalk-heart, .vivinho, .plant-spiral').delay(5000).fadeIn(0);
	$('.sheet-left, .sheet-right').delay(3500).fadeIn(0);
	$('#box-top-left').delay(8000).fadeIn();
	$('#box-bottom-left').delay(9000).fadeIn();
	$('#box-top-right').delay(10000).fadeIn();
	animateBallons();
	animateWheelchair();
	animateBook();
	animatePlantOneSheet();
	animateHeart();
	animateStalkHeart();
	animateVivinho();
	animatePlantSpiral();
	animateSheetLeft();
	animateSheetRight();
});