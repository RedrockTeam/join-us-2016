const imageNumber = 30;

const imageWidth = 121.3;

const sliceWrapTranslateZ = 0;

const sliceWrapRotateY = 175;

const initStageTranslateZ = 700;

const allowRotateX = 50;

const signUpLink = 'http://enroll.lot.cat/enroll/index';

let stopOrienter = false;



let $sliceWrap = $('.slice-wrap'),
    sliceWrap = $sliceWrap[0];

let $stage = $('.stage'),
    stage = $stage[0];


// 初始化
(function() {
    let str = '';

    for(let i = 1; i <= imageNumber; i ++) {
        str += `<div class="slice"></div>`;
    }

    $sliceWrap.html(str);
    let $slices = $sliceWrap.find('.slice');

    function calculateR(imageNumber, width) {
        let deg = 360/imageNumber/2;
        return (width/2) / Math.tan( 2 * Math.PI * (deg / 360)) - 10;
    }
    let R = calculateR(imageNumber, imageWidth);

    $slices.each((index, item) => {

        $(item).css({
            transform: `rotateY(${-360/imageNumber*index}deg) translateZ(-${R}px) translateY(-50px)`
        });
    });

    $sliceWrap.append(`<div class='sky' 
                            style='width: ${1.7*R}px; 
                            height: ${1.7*R}px;
                            background-image: url("dist/img/sky.png");
                            background-size: 100% 100%;
                            transform: rotateX(-90deg) translateZ(-600px) translateX(-50%)'></div>`)


    $sliceWrap.append(`<div class='sky' 
                            style='width: ${2.5*R}px; 
                            height: ${2.5*R}px;
                            background-image: url("dist/img/sky.png");
                            background-size: 100% 100%;
                            transform: rotateX(90deg) translateZ(-600px) translateX(-50%)'></div>`);



    $sliceWrap.append(`<a class="link" href=${signUpLink} style="
                            z-index: 10000;
                            display: inline-block;
                            width: 200px; 
                            height: 75px;
                            transform: rotateY(-325.429deg) translateZ(-570.891px) translateY(-1787px);"><a>`);



    $sliceWrap.css({
        transform: `translateZ(${sliceWrapTranslateZ}px) rotateY(${sliceWrapRotateY}deg)`
    });

    $stage.css({
        transform: `translateZ(${initStageTranslateZ}px)`
    })

}());



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
