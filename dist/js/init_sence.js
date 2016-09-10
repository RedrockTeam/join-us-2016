'use strict';

var imageNumber = 30;

var imageWidth = 121.3;

var sliceWrapTranslateZ = 0;

var sliceWrapRotateY = 175;

var initStageTranslateZ = 700;

var allowRotateX = 50;

var signUpLink = '#" onclick=alert("功能尚未开启,敬请期待")';

var stopOrienter = false;

var $sliceWrap = $('.slice-wrap'),
    sliceWrap = $sliceWrap[0];

var $stage = $('.stage'),
    stage = $stage[0];

// 初始化
(function () {
    var str = '';

    for (var i = 1; i <= imageNumber; i++) {
        str += '<div class="slice"></div>';
    }
    console.log(str);

    $sliceWrap.html(str);
    var $slices = $sliceWrap.find('.slice');

    function calculateR(imageNumber, width) {
        var deg = 360 / imageNumber / 2;
        return width / 2 / Math.tan(2 * Math.PI * (deg / 360)) - 10;
    }
    var R = calculateR(imageNumber, imageWidth);

    $slices.each(function (index, item) {

        $(item).css({
            transform: 'rotateY(' + -360 / imageNumber * index + 'deg) translateZ(-' + R + 'px) translateY(-50px)'
        });
    });

    $sliceWrap.append('<div class=\'sky\' \n                            style=\'width: ' + 1.7 * R + 'px; \n                            height: ' + 1.7 * R + 'px;\n                            background-image: url("dist/img/sky.png");\n                            background-size: 100% 100%;\n                            transform: rotateX(-90deg) translateZ(-600px) translateX(-50%)\'></div>');

    $sliceWrap.append('<div class=\'sky\' \n                            style=\'width: ' + 2.5 * R + 'px; \n                            height: ' + 2.5 * R + 'px;\n                            background-image: url("dist/img/sky.png");\n                            background-size: 100% 100%;\n                            transform: rotateX(90deg) translateZ(-600px) translateX(-50%)\'></div>');

    $sliceWrap.append('<a class="link" href=' + signUpLink + ' style="\n                            z-index: 10000;\n                            display: inline-block;\n                            width: 200px; \n                            height: 75px;\n                            transform: rotateY(-325.429deg) translateZ(-570.891px) translateY(-1787px);"><a>');

    $sliceWrap.css({
        transform: 'translateZ(' + sliceWrapTranslateZ + 'px) rotateY(' + sliceWrapRotateY + 'deg)'
    });

    $stage.css({
        transform: 'translateZ(' + initStageTranslateZ + 'px)'
    });
})();

// requestAnimationFrame
(function () {
    'use strict';

    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
        window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})();
//# sourceMappingURL=jsmap/init_sence.js.map
