// onLoad document
if (window.addEventListener) {
    fnEventListener = "addEventListener";
    load = "load";
    orientationchange = "orientationchange";
    resize = "resize";
} else if (window.attachEvent) {
    fnEventListener = "attachEvent";
    load = "onload";
    orientationchange = "onorientationchange";
    resize = "onresize";
}

// Size calculation fonts
function calcScaling() {
    var fontSizeTemplate = 62.5,
        widthTemplate = 640,
        documentWidth = window.innerWidth || document.body.clientWidth,
        resultFontSize = (documentWidth * fontSizeTemplate) / widthTemplate;
    document.body.style.fontSize = resultFontSize + '%';
}

// Builder
function build() {
    calcScaling();
    window[fnEventListener](orientationchange, function() {
        calcScaling();
    });
    window[fnEventListener](resize, function() {
        calcScaling();
    });
}

window[fnEventListener](load, function() {
    window.scrollTo(0, 0);
    build();
    thumb();
});

//Thumblist
function thumb() {
    var thumClicked = document.getElementsByClassName('thumb');

    for (var i = 0; i < thumClicked.length; i++) {
        thumClicked[i].onclick = function(element) {
            var activeThumb = this.parentNode.parentNode.getElementsByTagName('a');

            for (var i = 0; i < activeThumb.length; i++) {
                activeThumb[i].setAttribute('class', 'thumb')
            };

            var imgs = document.getElementsByClassName('receiveImg')[this.getAttribute('data-list')].getElementsByTagName('img');
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].setAttribute('class', 'hide')
            };
            this.setAttribute('class', 'thumb active');
            imgs[this.getAttribute('data-thumb')].setAttribute('class', 'show')
        };
    };



}
