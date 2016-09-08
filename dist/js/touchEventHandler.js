'use strict';

var orienterStartRotateX = 0;
var orienterStartRotateY = 0;

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

        handler.start && handler.start(touch);
    });

    $body.on('touchmove', function (e) {
        e.preventDefault();

        var touch = e.touches[0];

        touch.pdiffX = touch.clientX - p;
        p = touch.clientX;

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
    var rotateX = anime.getValue(stage, 'rotateX');

    if (currentZ <= 0) {
        currentZ /= 2;
        $stage.css({
            transform: 'rotateX(' + rotateX + ') translateZ(' + currentZ + 'px)'
        });
    }
})();

var bodyOnTouchHandler = {};

bodyOnTouchHandler.start = function (touch) {
    stopOrienter = true;
    this.startRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    this.startRotateX = parseFloat(anime.getValue(stage, 'rotateX'));
};

bodyOnTouchHandler.moving = function (touch) {

    var rotateY = this.startRotateY - touch.diffX / (imageNumber * imageWidth) * 360 * 1.5;
    var rotateX = this.startRotateX - touch.diffY / (imageNumber * imageWidth) * 360 * 1.5;

    if (rotateX > 40) {
        rotateX = 40;
    } else if (rotateX < -40) {
        rotateX = -40;
    }

    $sliceWrap.css({
        transform: 'translateZ(' + sliceWrapTranslateZ + 'px) rotateY(' + rotateY + 'deg)'
    });

    setTimeout(function () {
        var currentZ = parseFloat(anime.getValue(stage, 'translateZ'));
        var targetZ = currentZ - Math.abs(touch.diffX);
        var cZ = targetZ - currentZ;

        $stage.css({
            transform: 'rotateX(' + rotateX + 'deg) translateZ(' + cZ / 1.5 + 'px)'
        });
    }, 0);
};

bodyOnTouchHandler.end = function () {
    window.orienterStartRotateX = parseFloat(anime.getValue(stage, 'rotateX'));
    window.orienterStartRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    stopOrienter = false;
};

bodyMoving(bodyOnTouchHandler);
//# sourceMappingURL=jsmap/touchEventHandler.js.map
