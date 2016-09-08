var orienterStartRotateX = 0;
var orienterStartRotateY = 0;

function bodyMoving(handler) {
    let $body = $('body');

    let startX = 0;
    let startY = 0;


    let p = 0;

    $body.on('touchstart', (e) => {
        let touch = e.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        touch.startX = startX;
        touch.startY = startY;

        handler.start && handler.start(touch);

    });

    $body.on('touchmove', (e) => {
        e.preventDefault();

        let touch = e.touches[0];

        touch.pdiffX = touch.clientX - p;
        p = touch.clientX;

        touch.diffX = touch.clientX - startX;
        touch.diffY = touch.clientY - startY;

        handler.moving && handler.moving(touch);

    });
    $body.on('touchend', (e) => {
        let touch = e.touches[0];
        handler.end && handler.end(touch)
    });
}
(function moveToInitZ() {
    
    requestAnimationFrame(moveToInitZ);
    let currentZ = parseInt(anime.getValue(stage, 'translateZ'));
    let rotateX = anime.getValue(stage, 'rotateX');


    if(currentZ <= 0) {
        currentZ /= 2;
        $stage.css({
            transform: `rotateX(${rotateX}) translateZ(${currentZ}px)`,
        })
    }
})()

const bodyOnTouchHandler = {};

bodyOnTouchHandler.start = function(touch) {
    stopOrienter = true;
    this.startRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    this.startRotateX = parseFloat(anime.getValue(stage, 'rotateX'));
}

bodyOnTouchHandler.moving = function(touch) {

    let rotateY = this.startRotateY - (touch.diffX / (imageNumber * imageWidth) * 360 * 1.5);
    let rotateX = this.startRotateX - (touch.diffY / (imageNumber * imageWidth) * 360 * 1.5);

    if(rotateX > 40) {
        rotateX = 40;
    } else if(rotateX < -40) {
        rotateX = -40;
    }


    $sliceWrap.css({
        transform: `translateZ(${sliceWrapTranslateZ}px) rotateY(${rotateY}deg)`,
    });


    setTimeout(() => {
        let currentZ = parseFloat(anime.getValue(stage, 'translateZ'));
        let targetZ = currentZ - Math.abs(touch.diffX);
        let cZ = targetZ - currentZ;


        $stage.css({
            transform: `rotateX(${rotateX}deg) translateZ(${(cZ)/1.5}px)`
        });
    }, 0)
};


bodyOnTouchHandler.end = function() {
    window.orienterStartRotateX = parseFloat(anime.getValue(stage, 'rotateX'));
    window.orienterStartRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    stopOrienter = false;
}


bodyMoving(bodyOnTouchHandler);
















