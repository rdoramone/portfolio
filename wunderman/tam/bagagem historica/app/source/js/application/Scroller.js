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