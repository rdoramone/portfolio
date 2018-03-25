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