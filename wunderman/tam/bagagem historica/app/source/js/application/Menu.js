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