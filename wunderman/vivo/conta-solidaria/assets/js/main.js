function catchEvent(eventObj, event, eventHandler){
	if(eventObj){
		if(eventObj.addEventListener){
			eventObj.addEventListener(event, eventHandler, false);
		}
		else if(eventObj.attachEvent){
			event = "on" + event;
			eventObj.attachEvent(event, eventHandler);
		}
	}
}
catchEvent(window, 'load', setupEvents);
catchEvent(window, 'load', percentageBar);
catchEvent(window, 'load', animationHide);
catchEvent(window, 'load', delayAnimation);
catchEvent(window, 'load', carouselPhoto);
catchEvent(window, 'load', carouselVideo);
function setupEvents(evnt){
	catchEvent(document.getElementById('bt-indicate'), 'click', showLightbox);
	catchEvent(document.querySelectorAll('.close')[0], 'click', closeLightbox);
	catchEvent(document.getElementById('bg-lightbox'), 'click', closeLightbox);
	catchEvent(document.getElementById('codArea'), 'change', mask);
	catchEvent(document.getElementById('numPhone'), 'change', mask);
	catchEvent(document.getElementById('register'), 'submit', validateFormMobile);
	catchEvent(document.getElementById('registered'), 'submit', validateFormFixed);
	catchEvent(document.querySelectorAll('.bt-close')[0], 'click', closeLightbox);
	catchEvent(document.querySelectorAll('.close')[1], 'click', closeLightbox);
	catchEvent(document.querySelectorAll('.bt-close')[1], 'click', closeLightbox);
	catchEvent(document.querySelectorAll('.close')[2], 'click', closeLightbox);
	catchEvent(document.querySelectorAll('.bt-close')[2], 'click', closeLightbox);
	catchEvent(document.querySelectorAll('.close')[3], 'click', closeLightbox);
	catchEvent(document.getElementById('codArea'), 'change', fieldCorrect);
	catchEvent(document.getElementById('numPhone'), 'change', fieldCorrect);
	catchEvent(document.getElementById('msg-error'), 'change', fieldCorrect);
	catchEvent(document.getElementById('email'), 'change', fieldCorrect);
}
function lightbox(lightboxId){
	var bgLightbox = document.getElementById('bg-lightbox');
	var divideWindowHeight = window.outerHeight / 2;
	var divideWindowWidth = window.outerWidth / 2;
	var lightbox = document.getElementById(lightboxId);
	var lightboxHeight;
	var lightboxWidth;

    if(lightbox.currentStyle) {
        lightboxHeight = lightbox.currentStyle.height.replace('px', '') / 2;
        lightboxWidth = lightbox.currentStyle.width.replace('px', '') / 2;
    }
    else {
        lightboxHeight = parseInt(getComputedStyle(lightbox).getPropertyValue('height').replace('px', '')) / 2;
        lightboxWidth = parseInt(getComputedStyle(lightbox).getPropertyValue('width').replace('px', '')) / 2;
    }
    var windowHeight = document.documentElement.clientHeight;
    var windowWidth = document.documentElement.clientWidth;
    bgLightbox.style.display = 'block';
    bgLightbox.style.height = windowHeight + 'px';
    bgLightbox.style.width = windowWidth + 'px';
    lightbox.style.display = 'block';
    lightbox.style.top = ((windowHeight / 2) - lightboxHeight) + 'px';
    lightbox.style.left = ((windowWidth / 2) - lightboxWidth) + 'px';
}
function showLightbox(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	lightbox("lightbox-register");
}
function closeLightbox(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var bgLightbox = document.getElementById('bg-lightbox');
	var lightboxRegister = document.getElementById('lightbox-register');
	var lightboxError = document.getElementById('lightbox-error');
	var successEmail = document.getElementById('success-email');
	var successMobile = document.getElementById('success-mobile');
	
	bgLightbox.style.display = 'none';
	lightboxRegister.style.display = 'none';
	lightboxError.style.display = 'none';
	successEmail.style.display = 'none';
	successMobile.style.display = 'none';
}
function mask(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
		target.value = target.value.replace(/[\(\)]/g,'');
	var txtInput = target.value;
	var maskCodeArea = txtInput.replace(txtInput , '(' + txtInput + ')');
	var maskPhone = txtInput.replace(/([0-9]{4,5})([0-9]{4})/ , "$1-$2");

	if(target == document.getElementById('codArea')){
		if(target.value.length == 2){
			target.setAttribute("maxlength", "4");
			return target.value = maskCodeArea;
		} else {
			target.setAttribute("maxlength", "2");
			return target.value = '';
		}
	}
	else if(target == document.getElementById('numPhone')){
		if(target.value && target.value.length >= 8 && target.value.length <= 10){
			target.setAttribute("maxlength", 10);
			return target.value = maskPhone;
		} else {
			target.setAttribute("maxlength", 9);
			return target.value = '';
		}
	}
}
function loadAjax(formId) {
    var url = document.getElementById(formId).getAttribute("action");
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = JSON.parse(xmlhttp.responseText);
            if (result.Success) {
                document.getElementById("lightbox-register").style.display = "none";
                if(document.getElementById("registered") && result.Success){
                	console.log("email");
                	lightbox("success-email");
                }
                else if(document.getElementById("register") && result.Success){
                	console.log("mobile");
                	lightbox("success-mobile");
                }
            } 
            else {
            	if(result.Success == false){
                    document.getElementById("lightbox-register").style.display = "none";
                    document.getElementById("txt-lightbox").innerHTML = result.Message;
                    lightbox("lightbox-error");
            	}
            }
        } else if (xmlhttp.status == 500) {
            //erro
        }
    }

    var queryString = serialize(document.getElementById(formId));
    xmlhttp.open("POST", url + '?' + queryString, true);
    xmlhttp.send();
}
function serialize(form) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'checkbox':
                    case 'radio':
                        if (form.elements[i].checked) {
                            q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        }
                        break;
                }
                break;
            case 'file':
                break;
            case 'TEXTAREA':
                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                break;
            case 'SELECT':
                switch (form.elements[i].type) {
                    case 'select-one':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                    case 'select-multiple':
                        for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
                            if (form.elements[i].options[j].selected) {
                                q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].options[j].value));
                            }
                        }
                        break;
                }
                break;
            case 'BUTTON':
                switch (form.elements[i].type) {
                    case 'reset':
                    case 'submit':
                    case 'button':
                        q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[i].value));
                        break;
                }
                break;
        }
    }
    return q.join("&");
}
function validateFormMobile(evnt){
    var theEvent = evnt ? evnt : window.event;
    theEvent.preventDefault();

	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var codArea = document.getElementById('codArea');
	var numPhone = document.getElementById('numPhone');
	var msgErro = document.getElementById('msg-error');
	var codAreaRegex = new RegExp('\([0-9]{2}\)');
	var codAreaOk = codAreaRegex.test(codArea.value);
	var numPhoneRegex = new RegExp('([0-9]{4,5})\-([0-9]{4})');
	var numPhoneOk = numPhoneRegex.test(numPhone.value);

	if(codAreaOk && numPhoneOk){
	    loadAjax("register");
	}
	else if(!codAreaOk && numPhoneOk){
		msgErro.style.visibility = 'visible';
		codArea.setAttribute('class', 'field-error');
		codArea.focus();
	}
	else if(codAreaOk && !numPhoneOk){
		msgErro.style.visibility = 'visible';
		numPhone.setAttribute('class', 'field-error');
		numPhone.focus();
	}
	else if(!codAreaOk && !numPhoneOk){
		msgErro.style.visibility = 'visible';
		codArea.setAttribute('class', 'field-error');
		numPhone.setAttribute('class', 'field-error');
		codArea.focus();
    }
}
function fieldCorrect(evnt){
	var theEvent = evnt ? evnt : window.event;
	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var codArea = document.getElementById('codArea');
	var numPhone = document.getElementById('numPhone');
	var msgErro = document.getElementById('msg-error');
	var email = document.getElementById('email');
	if(codArea.getAttribute('class') == 'field-error'){
		codArea.setAttribute('class', '');
	}
	else if(numPhone.getAttribute('class') == 'field-error'){
		numPhone.setAttribute('class', '');
	}
	else if(msgErro.getAttribute('class') == 'field-error'){
		msgErro.setAttribute('class', '');
	}
	else if(email.getAttribute('class') == 'field-error'){
		email.setAttribute('class', '');
	}
}
function validateFormFixed(evnt) {
    var theEvent = evnt ? evnt : window.event;
    theEvent.preventDefault();

	var target = theEvent.target ? theEvent.target : theEvent.srcElement;
	var email = document.getElementById('email');
	var emailRegex = new RegExp('^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{4}', 'gi');
	var emailOk = emailRegex.test(email.value);

	if (emailOk) {
	    loadAjax("registered");
	}
	else{
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
function percentageBar(){
	var barCollection = document.querySelectorAll('.bar-collection').length;
	for(var i = 0; i < barCollection; i++){
		var percent = document.querySelectorAll('.ballon-percent-center')[i].innerHTML.replace('%', '');
		var valuePercent = Math.round(2.46 * percent) + 'px';
		document.querySelectorAll('.percentage-bar')[i].style.width = valuePercent;
		document.querySelectorAll('.box-ballon-percent')[i].style.left = valuePercent;
	}
}
function animationHide(){
	if(document.getElementById("box-animated")){
		document.getElementById('box-top-left').style.display = "none";
		document.getElementById('box-bottom-left').style.display = "none";
		document.getElementById('box-top-right').style.display = "none";
		document.getElementById('wheelchair').style.display = "none";
		document.getElementById('book').style.display = "none";
		document.getElementById('plant-one-sheet').style.display = "none";
		document.getElementById('heart').style.display = "none";
		document.getElementById('stalk-heart').style.display = "none";
		document.getElementById('vivinho').style.display = "none";
		document.getElementById('plant-spiral').style.display = "none";
		document.getElementById('sheet-left').style.display = "none";
		document.getElementById('sheet-right').style.display = "none";
	}	
}
function timeOut(delayTime, item, state){
	if(document.getElementById("box-animated")){
		setTimeout(function(){
			document.getElementById(item).style.display = state;
		}, delayTime);	
	}
}
function delayAnimation(){
	//Caso altere o tempo do setTimeout tem que ajustar no css em cada id abaixo, o tempo de delay para o Firefox.
	timeOut(1000, 'box-top-left', 'block');
	timeOut(3500, 'box-bottom-left', 'block');
	timeOut(6500, 'box-top-right', 'block');
	timeOut(500, 'wheelchair', 'block');
	timeOut(1000, 'book', 'block');
	timeOut(1500, 'plant-one-sheet', 'block');
	timeOut(2000, 'heart', 'block');
	timeOut(2000, 'stalk-heart', 'block');
	timeOut(2500, 'vivinho', 'block');
	timeOut(2500, 'plant-spiral', 'block');
	timeOut(2500, 'sheet-left', 'block');
	timeOut(2500, 'sheet-right', 'block');
}
function fadeIn(obj, timeFadeIn){
	function execute(obj, timeFadeIn, initial, end){
		var increment, opc, interval;
		if(initial == 0){
			increment = 2;
			obj.style.display = "block";
		}

		opc = initial;

		interval = setInterval(function(){
			if(opc == end){
				clearInterval(interval);
			}
			else{
				opc += increment;
				obj.style.opacity = opc/100;
				obj.style.filter = "alpha(opacity="+opc+")";
			}
		}, timeFadeIn * 10);
	}
	execute(obj, timeFadeIn, 0, 100);
}
function move(element, distance, time, direction){
	var initial = parseInt(element.style.left.replace("px", ""));
	var increment = 4;
	var interval;
	
	interval = setInterval(function(){
		if(initial == distance){
			clearInterval(interval);
		}
		else{
			if(direction == "right"){ 
				initial -= increment;
				element.style.left = initial + "px";
			}
			else{
				initial += increment;
				element.style.left = initial + "px";
			}
		}
	}, time);
}
function carouselPhoto(){
	if(document.querySelectorAll(".box-carousel-photo")[0]){
		var thumbPhoto = document.getElementById("thumbs");
		var itemPhotoActive = thumbPhoto.querySelectorAll("li.active")[0];
		var itemPhotoWidth, itemPhotoMarginLeft, itemPhotoMarginRight;

		if(itemPhotoActive.currentStyle){
			itemPhotoWidth = parseInt(itemPhotoActive.currentStyle.width.replace("px", ""));
			itemPhotoMarginLeft = parseInt(itemPhotoActive.currentStyle.marginLeft.replace("px",""));
			itemPhotoMarginRight = parseInt(itemPhotoActive.currentStyle.marginRight.replace("px",""));
		}
		else{
			itemPhotoWidth = Math.round(getComputedStyle(itemPhotoActive).getPropertyValue("width").replace("px",""));
			itemPhotoMarginLeft = Math.round(getComputedStyle(itemPhotoActive).getPropertyValue("margin-left").replace("px",""));
			itemPhotoMarginRight = Math.round(getComputedStyle(itemPhotoActive).getPropertyValue("margin-right").replace("px",""));
		}
		
		var itemPhotoOuterWidth = itemPhotoWidth + itemPhotoMarginLeft + itemPhotoMarginRight;
		var itemPhoto = thumbPhoto.getElementsByTagName("li");
		var numPhotoThumbs = itemPhoto.length;
		var maskPhoto = document.getElementById("mask-thumbs");
		var maskPhotoWidth;

		if(maskPhoto.currentStyle){
			maskPhotoWidth = parseInt(maskPhoto.currentStyle.width.replace("px",""));
		}
		else{
			maskPhotoWidth = Math.round(getComputedStyle(maskPhoto).getPropertyValue("width").replace("px",""));
		}
		
		var btNext = document.getElementById("btNext");
		var btPrev = document.getElementById("btPrev");
		var thumbPhotoWidth = 0;
		var j = 0;
		var k = 0;
		
		thumbPhoto.style.width = itemPhotoOuterWidth * numPhotoThumbs + "px";
		thumbPhoto.style.left = "0px";
		document.querySelectorAll('.box-txt-description ul li.active')[0].style.display = "block";
		document.querySelectorAll('.box-photo ul li.active')[0].style.display = "block";

		var boxPhoto = document.getElementById("box-photo");
		var boxTxtDescription = document.getElementById("box-txt-description");

		btNext.onclick = function(){
			j++;

			if(itemPhoto[j - 1].className == "first active" && itemPhoto[j].className == ""){
				itemPhoto[j - 1].className = "first";
				itemPhoto[j].className = "active";
			}
			else if(itemPhoto[j - 1].className == "active" && itemPhoto[j].className == ""){
				itemPhoto[j - 1].className = "";
				itemPhoto[j].className = "active";
			}
			else if(itemPhoto[j - 1].className == "active" && itemPhoto[j].className == "last"){
				itemPhoto[j - 1].className = "";
				itemPhoto[j].className = "last active";
			}
			else if(itemPhoto[j - 1].className == "last active" && itemPhoto[j].className == "first"){
				itemPhoto[j - 1].className = "last";
				itemPhoto[j].className = "first active";
			}

			boxPhoto.querySelectorAll("ul li")[j - 1].className = "";
			boxPhoto.querySelectorAll("ul li")[j - 1].style.display = "none";
			boxPhoto.querySelectorAll("ul li")[j - 1].style.opacity = 0;
			boxPhoto.querySelectorAll("ul li")[j - 1].style.filter = "alpha(opacity="+0+")";
			boxPhoto.querySelectorAll("ul li")[j].className = "active";
			fadeIn(boxPhoto.querySelectorAll('ul li')[j], 0.4);
			boxTxtDescription.querySelectorAll("ul li")[j - 1].className = "";
			boxTxtDescription.querySelectorAll("ul li")[j - 1].style.display = "none";
			boxTxtDescription.querySelectorAll("ul li")[j - 1].style.opacity = 0;
			boxTxtDescription.querySelectorAll("ul li")[j - 1].style.filter = "alpha(opacity="+0+")";
			boxTxtDescription.querySelectorAll("ul li")[j].className = "active";
			fadeIn(boxTxtDescription.querySelectorAll('ul li')[j], 0.4);

			if(j >= 1){
				btPrev.style.display = "block";
			}

			if(j == numPhotoThumbs - 1){
				btNext.style.display = "none";
			}

			if(j % 4 == 0){
				k++;
				thumbPhotoWidth = -(maskPhotoWidth * k);
				move(thumbPhoto, thumbPhotoWidth, 1, "right");
			}
		}
		btPrev.onclick = function(){
			j--;

			if(itemPhoto[j + 1].className == "first active" && itemPhoto[j].className == "last"){
				itemPhoto[j + 1].className = "first";
				itemPhoto[j].className = "last active";
			}
			else if(itemPhoto[j + 1].className == "last active" && itemPhoto[j].className == ""){
				itemPhoto[j + 1].className = "last";
				itemPhoto[j].className = "active";
			}
			else if(itemPhoto[j + 1].className == "active" && itemPhoto[j].className == ""){
				itemPhoto[j + 1].className = "";
				itemPhoto[j].className = "active";
			}
			else if(itemPhoto[j + 1].className == "active" && itemPhoto[j].className == "first"){
				itemPhoto[j + 1].className = "";
				itemPhoto[j].className = "first active";
			}

			boxPhoto.querySelectorAll("ul li")[j + 1].className = "";
			boxPhoto.querySelectorAll("ul li")[j + 1].style.display = "none";
			boxPhoto.querySelectorAll("ul li")[j + 1].style.opacity = "0";
			boxPhoto.querySelectorAll("ul li")[j + 1].style.filter = "alpha(opacity="+0+")";
			boxPhoto.querySelectorAll("ul li")[j].className = "active";
			fadeIn(boxPhoto.querySelectorAll('ul li')[j], 0.4);
			boxTxtDescription.querySelectorAll("ul li")[j + 1].className = "";
			boxTxtDescription.querySelectorAll("ul li")[j + 1].style.display = "none";
			boxTxtDescription.querySelectorAll("ul li")[j + 1].style.opacity = "0";
			boxTxtDescription.querySelectorAll("ul li")[j + 1].style.filter = "alpha(opacity="+0+")";
			boxTxtDescription.querySelectorAll("ul li")[j].className = "active";
			fadeIn(boxTxtDescription.querySelectorAll('ul li')[j], 0.4);

			if(j > 0 && (j + 1) % 4 == 0){
				k--;
				thumbPhotoWidth = (thumbPhotoWidth + maskPhotoWidth) * k;
				move(thumbPhoto, thumbPhotoWidth, 1, "left");
			}

			if(j < 1){
				btPrev.style.display = "none";
			}

			if(j <= numPhotoThumbs - 1){
				btNext.style.display = "block";
			}
		}
	    for ( i = 0; i < itemPhoto.length; i++ ) {
	        (function(index){
	            itemPhoto[i].onclick = function(){
	            	j = index;

					for(var s = 0; s < itemPhoto.length; s++){
						if(itemPhoto[s].className == "first active" && boxPhoto.querySelectorAll('ul li')[s].className == "active" && boxTxtDescription.querySelectorAll('ul li')[s].className == "active"){
							itemPhoto[s].className = "first";
							boxPhoto.querySelectorAll('ul li')[s].className = "";
							boxPhoto.querySelectorAll('ul li')[s].style.display = "none";
							boxTxtDescription.querySelectorAll('ul li')[s].className = "";
							boxTxtDescription.querySelectorAll('ul li')[s].style.display = "none";
						}
						else if(itemPhoto[s].className == "active" && boxPhoto.querySelectorAll('ul li')[s].className == "active" && boxTxtDescription.querySelectorAll('ul li')[s].className == "active"){
							itemPhoto[s].className = "";
							boxPhoto.querySelectorAll('ul li')[s].className = "";
							boxPhoto.querySelectorAll('ul li')[s].style.display = "none";
							boxTxtDescription.querySelectorAll('ul li')[s].className = "";
							boxTxtDescription.querySelectorAll('ul li')[s].style.display = "none";
						}
						else if(itemPhoto[s].className == "last active" && boxPhoto.querySelectorAll('ul li')[s].className == "active" && boxTxtDescription.querySelectorAll('ul li')[s].className == "active"){
							itemPhoto[s].className = "last";
							boxPhoto.querySelectorAll('ul li')[s].className = "";
							boxPhoto.querySelectorAll('ul li')[s].style.display = "none";
							boxTxtDescription.querySelectorAll('ul li')[s].className = "";
							boxTxtDescription.querySelectorAll('ul li')[s].style.display = "none";
						}
					}

	            	if(this.className == "first"){
	            		this.className = "first active";
	            	}
	            	else if(this.className == ""){
	            		this.className = "active";	
	            	}
	            	else if(this.className == "last"){
	            		this.className = "last active";	
	            	}

	            	if(j < 1){
						btPrev.style.display = "none";
					}
					
					if(j <= numPhotoThumbs - 1){
						btNext.style.display = "block";
					}
					
					if(j >= 1){
						btPrev.style.display = "block";
					}
					
					if(j == numPhotoThumbs - 1){
						btNext.style.display = "none";
					}

					boxPhoto.querySelectorAll("ul li")[j].className = "active";
					fadeIn(boxPhoto.querySelectorAll('ul li')[j], 0.4);
					boxTxtDescription.querySelectorAll("ul li")[j].className = "active";
					fadeIn(boxTxtDescription.querySelectorAll('ul li')[j], 0.4);
	            }
	        })(i);
	    };

		for(var i = 4; i < numPhotoThumbs; i++)	{
			if(i % 4 == 0){
				itemPhoto[i].className = "first";
				itemPhoto[i - 1].className = "last";
			}
		}
	}
}
function carouselVideo(){
	if(document.querySelectorAll(".box-carousel-video")[0]){
		var thumbVideos = document.getElementById("thumbs-video");
		var itemVideoActive = thumbVideos.querySelectorAll('.active')[0];
		var itemVideoWidth, itemVideoMarginLeft, itemVideoMarginRight;
		
		if(itemVideoActive.currentStyle){
			itemVideoWidth = parseInt(itemVideoActive.currentStyle.width.replace('px', ''));
			itemVideoMarginLeft = parseInt(itemVideoActive.currentStyle.marginLeft.replace('px', ''));
			itemVideoMarginRight = parseInt(itemVideoActive.currentStyle.marginRight.replace('px', ''));
		}
		else{
			itemVideoWidth = parseInt(getComputedStyle(itemVideoActive).getPropertyValue('width').replace('px', ''));
			itemVideoMarginLeft = parseInt(getComputedStyle(itemVideoActive).getPropertyValue('margin-left').replace('px', ''));
			itemVideoMarginRight = parseInt(getComputedStyle(itemVideoActive).getPropertyValue('margin-right').replace('px', ''));
		}

		var itemVideoOuterWidth = itemVideoWidth + itemVideoMarginLeft + itemVideoMarginRight;
		var itemVideo = thumbVideos.getElementsByTagName("li");
		var numVideoThumbs = itemVideo.length;
		var maskVideo = document.getElementById('mask-thumbs-video');
		var maskVideoWidth;

		if(maskVideo.currentStyle){
			maskVideoWidth = parseInt(maskVideo.currentStyle.width.replace("px",""));
		}
		else{
			maskVideoWidth = parseInt(getComputedStyle(maskVideo).getPropertyValue("width").replace("px", ""));
		}

		var btNextVideo = document.getElementById("btNextVideo");
		var btPrevVideo = document.getElementById("btPrevVideo");
		var thumbVideosWidth = 0;
		var n = 0;
		var o = 0;

		thumbVideos.style.width = itemVideoOuterWidth * numVideoThumbs + "px";
		thumbVideos.style.left = "0px";
		document.querySelectorAll('.box-video ul li.active')[0].style.display = "block";

		var boxVideo = document.getElementById("box-video");

		btNextVideo.onclick = function(){
			n++;

			if(itemVideo[n - 1].className == "first active" && itemVideo[n].className == ""){
				itemVideo[n - 1].className = "first";
				itemVideo[n].className = "active"; 
			}
			else if(itemVideo[n - 1].className == "active" && itemVideo[n].className == "last"){
				itemVideo[n - 1].className = "";
				itemVideo[n].className = "last active";
			}
			else if(itemVideo[n - 1].className == "last active" && itemVideo[n].className == "first"){
				itemVideo[n - 1].className = "last"; 
				itemVideo[n].className = "first active";
			}

			boxVideo.querySelectorAll('ul li')[n - 1].className = "";
			boxVideo.querySelectorAll('ul li')[n - 1].style.display = "none";
			boxVideo.querySelectorAll('ul li')[n].className = "active";
			fadeIn(boxVideo.querySelectorAll('ul li')[n], 0.4);

			if(n <= 1){
				btPrevVideo.style.display = "block";
			}

			if(n == numVideoThumbs - 1){
				btNextVideo.style.display = "none";
			}

			if(n % 3 == 0){
				o++;
				thumbVideosWidth = -(maskVideoWidth * o);
				move(thumbVideos, thumbVideosWidth, 1, "right");
			}
		}
		btPrevVideo.onclick = function(){
			n--;

			if(itemVideo[n].className == "last" && itemVideo[n + 1].className == "first active"){
				itemVideo[n + 1].className = "first";
				itemVideo[n].className = "last active";
			}
			else if(itemVideo[n].className == "" && itemVideo[n + 1].className == "last active"){
				itemVideo[n + 1].className = "last";
				itemVideo[n].className = "active";
			}
			else if(itemVideo[n].className == "first" && itemVideo[n + 1].className == "active"){
				itemVideo[n + 1].className = ""; 
				itemVideo[n].className = "first active";
			}

			boxVideo.querySelectorAll('ul li')[n + 1].className = "";
			boxVideo.querySelectorAll('ul li')[n + 1].style.display = "none";
			boxVideo.querySelectorAll('ul li')[n].className = "active";
			fadeIn(boxVideo.querySelectorAll('ul li')[n], 0.4);
			boxVideo.querySelectorAll('ul li')[n].style.display = "block";
			
			if(n < numVideoThumbs - 1){
				btNextVideo.style.display = "block";
			}

			if(n < 1){
				btPrevVideo.style.display = "none";
			}

			if(n > 0 && (n + 1) % 3 == 0){
				o--;
				thumbVideosWidth = thumbVideosWidth + maskVideoWidth;
				move(thumbVideos, thumbVideosWidth, 1, "left");
			}
		}
		for ( i = 0; i < itemVideo.length; i++ ) {
	        (function(index){
	            itemVideo[i].onclick = function(){

	            	n = index;

					for(var s = 0; s < itemVideo.length; s++){
						if(itemVideo[s].className == "first active" && boxVideo.querySelectorAll('ul li')[s].className == "active"){
							itemVideo[s].className = "first";
							boxVideo.querySelectorAll('ul li')[s].className = "";
							boxVideo.querySelectorAll('ul li')[s].style.display = "none";
						}
						else if(itemVideo[s].className == "active" && boxVideo.querySelectorAll('ul li')[s].className == "active"){
							itemVideo[s].className = "";
							boxVideo.querySelectorAll('ul li')[s].className = "";
							boxVideo.querySelectorAll('ul li')[s].style.display = "none";
						}
						else if(itemVideo[s].className == "last active" && boxVideo.querySelectorAll('ul li')[s].className == "active"){
							itemVideo[s].className = "last";
							boxVideo.querySelectorAll('ul li')[s].className = "";
							boxVideo.querySelectorAll('ul li')[s].style.display = "none";
						}
					}

	            	if(this.className == "first"){
	            		this.className = "first active";
	            	}
	            	else if(this.className == ""){
	            		this.className = "active";	
	            	}
	            	else if(this.className == "last"){
	            		this.className = "last active";	
	            	}

	            	if(n <= 1){
						btPrevVideo.style.display = "block";
					}
					
					if(n == numVideoThumbs - 1){
						btNextVideo.style.display = "none";
					}

					if(n < numVideoThumbs - 1){
						btNextVideo.style.display = "block";
					}

					if(n < 1){
						btPrevVideo.style.display = "none";
					}

					boxVideo.querySelectorAll("ul li")[n].className = "active";
					fadeIn(boxVideo.querySelectorAll('ul li')[n], 0.4);
	            }
	        })(i);
	    };

		for(var m = 3; m < numVideoThumbs; m++){
			if(m % 3 == 0){
				itemVideo[m].className = "first";
				itemVideo[m - 1].className = "last";
			}
		}
	}
}