/* @author - André Mattos */
( function ( window )
{

    window.SpriteAnim = ( function ()
    {

        function SpriteAnim( element, imgUrl, imgW, imgH, totalFrames, frameW, frameH )
        {
            // declaring initial properties
            this.FPS = 24;
            this._events = {};
            this._interval = 0;
            this._currentFrame = 0;
            this._frames = [];
            this.looping = false;

            // assigning constructor parameters
            this._element = element;
            this._imgUrl = imgUrl;
            this._imgW = imgW;
            this._imgH = imgH;
            this._totalFrames = totalFrames;
            this._frameW = frameW;
            this._frameH = frameH;

            this._build()
        }

        SpriteAnim.prototype._build = function ()
        {
            var cols, rows, c, r, pos;

            // grid with positions
            cols = Math.floor( this._imgW / this._frameW );
            rows = Math.floor( this._imgH / this._frameH );

            for ( r = 0; r < rows; r++ )
            {
                for ( c = 0; c < cols; c++ )
                {
                    if ( this._frames.length < this._totalFrames )
                    {
                        pos = {
                            x: c * this._frameW,
                            y: r * this._frameH
                        }
                        this._frames.push( pos );
                    }
                }
            }

            // setting element background-image
            this._element.style.backgroundImage = "url(" + this._imgUrl + ")";
            this._element.style.backgroundPosition = "0px 0px"
            this._element.style.backgroundRepeat = "no-repeat";

            this._update();
        }

        SpriteAnim.prototype._update = function ()
        {

            this._updateElement();

            var nextFrame = this._currentFrame + 1;

            if ( nextFrame > this._totalFrames - 1 )
            {
                if ( this.looping ) nextFrame = 0;
                else
                {
                    nextFrame = this._totalFrames - 1;
                    this.pause();
                    this.trigger( "complete" )
                }
            }

            this._currentFrame = nextFrame;
        }

        SpriteAnim.prototype._updateElement = function ()
        {
            var framePos = this._frames[ this._currentFrame ];
            this._element.style.backgroundPosition = ( -framePos.x ) + "px " + ( -framePos.y ) + "px"

        }

        SpriteAnim.prototype.play = function ( delay )
        {

            var self = this;

            setTimeout( function ()
            {

                if ( self._currentFrame == self._totalFrames - 1 )
                {
                    self._currentFrame = 0;
                }
                clearInterval( self._interval )

                self._interval = setInterval( function ()
                {
                    self._update();
                }, 1000 / self.FPS );

            }, delay * 1000 )
        }

        SpriteAnim.prototype.pause = function ()
        {
            clearInterval( this._interval )
        }

        SpriteAnim.prototype.reset = function ()
        {
            this._currentFrame = 0;
            this._update();
        }

        SpriteAnim.prototype.gotoFrame = function ( frame )
        {
            if ( frame < 0 || frame > this._totalFrames - 1 )
                return

            this._currentFrame = frame;
            this._update();
        }

        SpriteAnim.prototype.on = function ( event, listener )
        {
            if ( !this._events[ event ] )
                this._events[ event ] = []

            this._events[ event ].push( listener );
        }

        SpriteAnim.prototype.trigger = function ( event )
        {
            if ( this._events[ event ] && this._events[ event ].length > 0 )
                for ( var i = 0; i < this._events[ event ].length; i++ )
                {
                    this._events[ event ][ i ]();
                }
        }


        return SpriteAnim;
    } )();

} )( window );
