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