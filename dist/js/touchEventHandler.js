'use strict';

var orienterStartRotateX = 0;
var orienterStartRotateY = 0;

function throttle(method, delay, duration) {
    var timer = null;
    var begin = new Date();
    return function () {
        var context = this,
            args = arguments,
            current = new Date();

        clearTimeout(timer);

        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }
    };
}

function bodyMoving(handler) {
    var $body = $('body');

    var startX = 0;
    var startY = 0;

    var p = 0;

    $body.on('touchstart', function (e) {
        var touch = e.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        touch.startX = startX;
        touch.startY = startY;
        p = touch.clientX;

        handler.start && handler.start(touch);
    });

    $body.on('touchmove', function (e) {
        e.preventDefault();

        var touch = e.touches[0];

        touch.pdiffX = Math.abs(touch.clientX - p);
        p = touch.clientX;

        // console.log(touch.pdiffX);
        touch.diffX = touch.clientX - startX;
        touch.diffY = touch.clientY - startY;

        handler.moving && handler.moving(touch);
    });
    $body.on('touchend', function (e) {
        var touch = e.touches[0];
        handler.end && handler.end(touch);
    });
}

(function moveToInitZ() {

    requestAnimationFrame(moveToInitZ);
    var currentZ = parseInt(anime.getValue(stage, 'translateZ'));

    var a = (currentZ + initStageTranslateZ * 2) / 3;
    $stage.css({
        transform: 'translateZ(' + a + 'px)'
    });
})();

var bodyOnTouchHandler = {};

bodyOnTouchHandler.start = function (touch) {
    stopOrienter = true;
    this.startRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    this.startRotateX = parseFloat(anime.getValue(sliceWrap, 'rotateX'));
};

bodyOnTouchHandler.moving = function (touch) {
    var _this = this;

    throttle(function (X) {

        var rotateY = _this.startRotateY - touch.diffX / (imageNumber * imageWidth) * 360 * 1.5;
        var rotateX = _this.startRotateX + touch.diffY / (imageNumber * imageWidth) * 360 * 1.5;

        if (rotateX > allowRotateX) {
            rotateX = allowRotateX;
        } else if (rotateX < -allowRotateX) {
            rotateX = -allowRotateX;
        }

        $sliceWrap.css({
            transform: 'translateZ(' + sliceWrapTranslateZ + 'px) \n                    rotateX(' + rotateX + 'deg) \n                    rotateY(' + rotateY + 'deg)'
        });

        requestAnimationFrame(function () {
            var z = parseFloat(anime.getValue(stage, 'translateZ'));

            var tz = z - X * 30;
            var a = (z + tz) / 2;
            $stage.css({
                transform: 'translateZ(' + a + 'px)'
            });
        });
    }, 0, 100)(touch.pdiffX);
};

bodyOnTouchHandler.end = function () {
    window.orienterStartRotateX = parseFloat(anime.getValue(sliceWrap, 'rotateX'));
    window.orienterStartRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    stopOrienter = false;
};

bodyMoving(bodyOnTouchHandler);
//# sourceMappingURL=jsmap/touchEventHandler.js.map
