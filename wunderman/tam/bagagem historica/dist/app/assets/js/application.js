var _porcent = [ "0%", "50%", "97%" ];
var _imgW = 1920;
var _imgH = 1080;
var _imgWFull = _imgW * 3;

function Carousel (container, pages) {
	this.cont = document.querySelector("#" + container);
	this.imgWrap = this.cont.querySelector(".img_wrap");

	this.cont.index = 0;
	this.cont.total = pages;
	this.pgs = pages;
	this.arrowRight = this.cont.querySelector(".arrow-right");
	this.arrowLeft = this.cont.querySelector(".arrow-left");
	this.arrowRight.addEventListener("click", this.next);
	this.arrowLeft.addEventListener("click", this.prev);
}

Carousel.prototype.next = function() {
	this.parentNode.index++;
	viewContent( this.parentNode.index, this.parentNode );
	playBG( this.parentNode.index, this.parentNode );
	TweenMax.to( this.parentNode.querySelector(".arrow-left"), .5, { left : 0 });
	if (this.parentNode.index == (this.parentNode.total - 1)) closeArrow(this); 
};

Carousel.prototype.prev = function() {
	this.parentNode.index--;
	playBG( this.parentNode.index, this.parentNode );
	TweenMax.to( this.parentNode.querySelector(".arrow-right"), .5, { right : 0 });
	if (this.parentNode.index == 0) closeArrow(this);
	viewContent( this.parentNode.index, this.parentNode );
};

Carousel.prototype.goPage = function( ind ) {
	this.parentNode.index = ind;
	TweenMax.to( this.parentNode, 0, { backgroundPosition : _porcent[ind] + " 0" } );
};

Carousel.prototype.setIndex = function( num ) {
	this.cont.index = num;
	playBG( this.cont.index, this.cont );
	viewContent( this.cont.index, this.cont );
	closeArrow( this.arrowLeft );
};

Carousel.prototype.resize = function (w, h){
	// console.log("carousel resize ", this.imgWrap)

    var ratioW = w / _imgW;
    var ratioH = h / _imgH;

    var scale = ratioW > ratioH ? ratioW : ratioH;
    var iw = _imgW * scale;
    var ih = _imgH * scale;

    var x = (w - iw) * 0.5;
    var y = (h - ih) * 0.5;

    TweenMax.set(this.imgWrap, {x:x, y:y, scale:scale, transformOrigin:"0 0"});
}

function playBG( num, obj ) {
	var img = obj.querySelector("img");
	TweenMax.to( img, 1, { x : _imgW * -num } );
}

function closeArrow( arw ) {
	( arw.className == "arrow-right" ) ? TweenMax.to( arw, .5, { right : -90 }) : TweenMax.to( arw, .5, { left : -90 });
}

function viewContent( num, obj ) {
	( num == 0 ) ? TweenMax.to( obj.querySelector(".content-carousel"), .5, { alpha : 1 }) : TweenMax.to( obj.querySelector(".content-carousel"), .5, { alpha : 0 });
}
var sitemap = [];
var submap = [];
var timeMenu;

function Menu() {
	if (!Menu.instance) {
		Menu.instance = this;
	}

	return Menu.instance;
}

Menu.prototype.init = function(first_argument) {
	addEventMenu();
	addEventSubMenu();
};

Menu.prototype.addSection = function( sec, item, over ) {
	sitemap.push({ section : sec, button : item, overHanlder : ( over ) ? true : false });
};

Menu.prototype.addSub = function( sec, item ) {
	submap.push({ section : sec, button : item });
};

Menu.prototype.addOver = function( element ) {
	controllOver();
	$( element ).addClass('menu-current');
};

Menu.prototype.goSection = function( idx ) {
	scrollToMenu( document.querySelector(sitemap[idx].section).offsetTop );
};

Menu.prototype.goSectionName = function( _id_ ) {
	scrollToMenu(document.querySelector(_id_).offsetTop);
};

Menu.prototype.getSiteMapTotal = function() {
	return sitemap.length;
};

Menu.prototype.getItemMap = function( idx ) {
	return sitemap[idx];
};

function addEventMenu() {
	var _btn;

	for(var j = 0; j < sitemap.length; j++ ) {
		_btn = document.querySelector(sitemap[j].button);
		_btn.link = sitemap[j].section;
		_btn.addEventListener( "click", clickHandlerMenu );
		if( sitemap[j].overHanlder )
		{
			_btn.addEventListener( "mouseover", overHandlerMenu );
			_btn.addEventListener( "mouseout", outHandlerMenu );
		}
	}
};

function addEventSubMenu() {
	var _btn;

	for(var j = 0; j < submap.length; j++ ) {
		_btn = document.querySelector(submap[j].button);
		_btn.link = submap[j].section;
		_btn.addEventListener( "click", clickHandlerSubMenu );
		_btn.addEventListener( "mouseover", overHandlerMenu );
		_btn.addEventListener( "mouseout", outHandlerMenu );
	}
};

function overHandlerMenu() {
	if(timeMenu) clearTimeout(timeMenu);
	TweenMax.to( $(".submenu"), .5, { height : 79 });
	TweenMax.to( $("#menu"), .5, { top : 79 });
};

function outHandlerMenu() {
	timeMenu = setTimeout( outSubMenu, 500 );
};

function outSubMenu() {
	TweenMax.to( $(".submenu"), .5, { height : 0 });
	TweenMax.to( $("#menu"), .5, { top : 0 });
};

function clickHandlerMenu() {
	var getPosY = document.querySelector(this.link).offsetTop;

	controllOver();
	scrollToMenu( getPosY );

	$( this ).addClass('menu-current');
};

function clickHandlerSubMenu() {
	var getPosY = document.querySelector(this.link).offsetTop;

	scrollToMenu( getPosY );
	$(this).parent().parent().children('li').find('a').css('backgroundPosition', '0 0');
	$(this).css('backgroundPosition', '0 -178px');
	outSubMenu();
};

function scrollToMenu( posY ) {
	_scroller.stop();
	$("html, body").stop().animate({scrollTop : posY}, 2000);
};

function controllOver() {
	var _btn;

	for(var j = 0; j < sitemap.length; j++ ) {
		_btn = document.querySelector(sitemap[j].button);
		$( _btn ).removeClass('menu-current');
	}
};
var flagAnim1 = true;
var flagAnim2 = true;
var flagAnim3 = true;

function playPlane (objCanvas, objAirplane, coord, widthObjCanvas, heightObjCanvas, duration, dynamic){
	var ctx = objCanvas.getContext("2d");
	var objAnim = {x:0, y:0};
	
	if (dynamic){
		coord[3].x = widthObjCanvas -2;
	}
		
	ctx.strokeStyle = "#161616";
	ctx.lineWidth = 1;
	ctx.moveTo(coord[0].x, coord[0].y);

	function draw(){
		ctx.clearRect(0, 0, widthObjCanvas, heightObjCanvas);
		ctx.lineTo(objAnim.x + 13, objAnim.y + 13);
		ctx.stroke();
	}

	TweenMax.to([objAirplane, objAnim], duration, {bezier:{type:"cubic", values:coord, autoRotate:["x","y","rotation", 0, false]}, ease:Power1.easeInOut, onUpdate: draw});
}

function createPlane(positionScroll, flag, obj, coord, widthObjCanvas, heightObjCanvas, duration, dynamic){

	var objCanvas = $("<canvas/>");
	var objAirplane = $("<div/>").addClass("airplane");

	obj.append(objCanvas);
	obj.append(objAirplane);

	if (dynamic)
		widthObjCanvas = $(window).width() / 2 + 300;
	
	objCanvas.attr({
		width: widthObjCanvas,
		height:heightObjCanvas,
	});	


	$(window).scroll(function(){
		var posTop = $(window).scrollTop();

		if(posTop > positionScroll && flag){
			flag = !flag;
			objAirplane.show();
			playPlane(objCanvas[0], objAirplane[0], coord, widthObjCanvas, heightObjCanvas, duration, dynamic);
		}
	});	
}
Scroller = (function (){

    var animating = false;
    var sections = [$("#home"), $("#video"), $("#modelos"), $("#bis"), $("#spitfire"), $("#gloster"), $("#flea"), $("#contato"), $("footer")];
    var totalSections = sections.length;
    var indexSection = 0;
    var timeoutsnap;
    var objAnim = {s:0};

    function Scroller(){

        this.init();

    }

    Scroller.prototype.init = function (){

        var self = this;

        $(window).scroll(function(){

            var pos = $(window).scrollTop()
            var sectionOffset = pos/$(window).height();

            if (sectionOffset > totalSections-2)
                indexSection = totalSections-1;
            else
                indexSection = Math.round(sectionOffset);

            clearTimeout(timeoutsnap);
            timeoutsnap = setTimeout(function(){
                self.gotoSection(indexSection, false, .3);

            }, 500)
        })

        $(window).on('mousewheel', function( ev, delta ){

            self.gotoSection(indexSection - delta);
            

            return false;

        });
    }

    Scroller.prototype.next = function(){

        this.gotoSection(indexSection + 1, true);

    }

    Scroller.prototype.prev = function (){

        this.gotoSection(indexSection - 1, true);

    }

    Scroller.prototype.stop = function (){
        animating = false;
        TweenMax.killTweensOf(objAnim);

    }

    Scroller.prototype.gotoSection = function (i, force, t){
        if (force){
            animating = false;
        }

        if ( animating )
            return true;

        clearTimeout(timeoutsnap);

        t = t || .8;

        if (i < 0)
            i = 0
        else if (i > totalSections-1)
            i = totalSections-1;

        animating = true;

        // canceling animation via jQuery animate (by menu)
        $("html, body").stop()

        var pagePos = sections[i].position().top;

        TweenMax.killTweensOf(objAnim);
        
        objAnim.s = $(window).scrollTop();

        
        TweenMax.to( objAnim, t, {
            s: pagePos,
            ease: Sine.easeInOut,
            onUpdate:function(){
                $(window).scrollTop(objAnim.s);
            },
            onComplete: function() {
                clearTimeout(timeoutsnap);

                animating =  false;

            }
        });

    }

    return Scroller;

})();
    var points1 = [{x:-13, y:0}, {x:160, y:260}, {x:260, y:260}, {x:1144, y:260}];
    var points2 = [{x:170, y:1200}, {x:-180, y:640}, {x:70, y:220}, {x:280, y:10}];
    var points3 = [{x:70, y:800}, {x:240, y:420}, {x:170, y:200}, {x:30, y:0}];
    var FRICTION = .97;
    var MAX_VEL = 30;
    var FPS = 30;
    var _deg = 360;
    var _oldScroll = 0;
    var _current = 0;
    var _vr = 0;
    var _cloudGo = 0;
    var _car1,
    	_car2,
    	_car3,
        _car4,
    	_cars = [],
    	_helice,
    	_time,
    	_thumbVideo,
    	_btnPlay,
        _menu,
        _txtArrow;

    var _scroller;

    function init() {
        //Instance the menu
        _menu = new Menu();
        _menu.addSection("#home", ".btn-home");
        _menu.addSection("#video", ".btn-projeto");
        _menu.addSection("#modelos", ".btn-frota", true);
        _menu.addSection("#contato", ".btn-visite");
        _menu.addSub("#bis", ".btn-14bis");
        _menu.addSub("#spitfire", ".btn-spitfire");
        _menu.addSub("#gloster", ".btn-gloster");
        _menu.addSub("#flea", ".btn-flea");
        _menu.init();
        _menu.addOver( ".btn-home" );

        // Set all the Carousels
        _car1 = new Carousel("bis", 3);
        _car2 = new Carousel("flea", 3);
        _car3 = new Carousel("gloster", 3);
        _car4 = new Carousel("spitfire", 3);
        _cars.push(_car1);
        _cars.push(_car2);
        _cars.push(_car3);
        _cars.push(_car4);

        _btnPlay = document.querySelector(".btn-play");
        _thumbVideo = document.querySelector(".thumb-video");
        _txtArrow = document.querySelector(".text-arrow");
        _arrowNext = document.querySelector(".arrow-next");
        _logoTam = document.querySelector(".btn-logo-tam");
        _logoBagagem = document.querySelector(".btn-logo-bagagem-historica");

        _thumbVideo.addEventListener("mouseover", overHandlerVideo);
        _thumbVideo.addEventListener("mouseout", outHandlerVideo);
        _thumbVideo.addEventListener("click", clickHandlerVideo);
        _btnPlay.addEventListener("mouseover", overHandlerVideo);
        _btnPlay.addEventListener("mouseout", outHandlerVideo);
        _btnPlay.addEventListener("click", clickHandlerVideo);
        _txtArrow.addEventListener("click", clickHandlerArrow);
        _arrowNext.addEventListener("click", clickHandlerNextArrow);
        _logoTam.addEventListener("click", clickHandlerLogos);
        _logoBagagem.addEventListener("click", clickHandlerLogos);

        createPlane(1200, flagAnim1, $("#box-airplane1"), points1, 1160, 290, 5, true);
        createPlane(4200, flagAnim2, $("#box-airplane2"), points2, 310, 1400, 5);
        createPlane(4200, flagAnim3, $("#box-airplane3"), points3, 260, 1000, 5);

        _helice = document.getElementById("helice");
        _time = setInterval(interactionsControl, 1000/FPS);
        animaHome();

        $(window).resize(function(){
            resize();
        })

        $(window).scroll(function(){
            resetCars();
        })

        resize();
        initAbaScroll();
        $('.nuvens').parallax();

        setTimeout(function(){
            $(window).scrollTop(0);

            _scroller = new Scroller();
            
        },0);
    }

    function resetCars(){
        _car1.setIndex( 0 );
        _car2.setIndex( 0 );
        _car3.setIndex( 0 );
        _car4.setIndex( 0 );
    }

    function initAbaScroll(){

        $(".aba-bottom").each(function(index, value){
            $(value).css("margin-left", -$(value).outerWidth()/2);
        })

        $('.aba-bottom').on('click', function(event){
            _scroller.next();

            resetCars();
        });
    }

    function animaHome() {
        TweenMax.to( $("#menu"), 1, { height : 35, delay: 1.5, onComplete : openScroll } );
        TweenMax.to( $(".container-buttons"), 1, { opacity : 1, delay: 2.4 } );
        TweenMax.from( $(".title-home"), 1, { bottom : 100, opacity: 0, delay: 2.5 } );
        TweenMax.from( $(".text-arrow"), 1, { bottom : 10, opacity: 0, delay: 3 } );
    }

    function openScroll() {
        $("html, body").css('overflow', 'visible');
    }

    function resize (){
        var w = $(window).width();
        var h = $(window).height();

        for (var i=0; i < _cars.length; i++)
            _cars[i].resize(w, h);

    }

    function initialize() {
        var mapOptions = {
            zoom: 9,
            center: new google.maps.LatLng(-21.784688, -47.900734)
        };

        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(-21.784688, -47.900734),
            map: map,
            title: 'Museu TAM'
        });

        var styles = [
                {
                    featureType: "all",
                    stylers: [
                        { hue: "#e1d3b3" },
                        { saturation: -20 }
                    ]
                }
            ];

         map.setOptions({styles: styles});
    }

    function interactionsControl() {
        rotation();
        controlerScrollMenu();
    }

    function rotation() {
        _oldScroll = _current;
        _current = $(window).scrollTop();

        var velScroll = _oldScroll - _current;

        _vr += velScroll * .01;

        if (_vr < -MAX_VEL)
            _vr = -MAX_VEL
        else if (_vr > MAX_VEL)
            _vr = MAX_VEL

        _vr *= FRICTION;
        _deg += _vr;

        _helice.style.webkitTransform = "rotateZ(" + -(_deg) + "deg)";
        _helice.style.mozTransform = "rotateZ(" + -(_deg) + "deg)";
        _helice.style.msTransform = "rotateZ(" + -(_deg) + "deg)";
        _helice.style.oTransform = "rotateZ(" + -(_deg) + "deg)";
        _helice.style.transform = "rotateZ(" + -(_deg) + "deg)";
    }

    function controlerScrollMenu() {
        var i = _menu.getSiteMapTotal();
        var item;

        while(i > 0) {
            item = _menu.getItemMap(i - 1);
            if( _current >= document.querySelector(item.section).offsetTop && _current <= ((document.querySelector(item.section).offsetTop + document.querySelector(item.section).offsetHeight) - 10) )
                _menu.addOver(item.button);
            i--;
        }
    }

    function clickHandlerLogos() {
        $('.container-submenu li a').css('backgroundPosition', '0 0');
        _menu.goSection(0);
    }

    function clickHandlerArrow() {
        _menu.goSection(1);
    }

    function clickHandlerNextArrow() {
        _menu.goSection(2);
    }

    function clickHandlerVideo() {
    	var _w = _thumbVideo.offsetWidth;
    	var _h = _thumbVideo.offsetHeight;

    	$( ".content-video" ).append('<embed width="' + _w + '" height="'+ _h +'" src="http://www.youtube.com/v/Wns7f6Evi2I?autoplay=1&vq=hd720" class="video-youtube">');

    	TweenMax.to( _btnPlay, .5, { autoAlpha : 0 });
    	TweenMax.to( _thumbVideo, .5, { autoAlpha : 0 });
    }

    function overHandlerVideo() {
    	TweenMax.to( _btnPlay, .5, { scale : .8, ease:Back.easeOut });
    }

	function outHandlerVideo() {
    	TweenMax.to( _btnPlay, .5, { scale : 1, ease:Back.easeOut });
    }

    google.maps.event.addDomListener(window, 'load', initialize);
    window.onload = init;