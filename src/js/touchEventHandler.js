let orienterStartRotateX = 0;
let orienterStartRotateY = 0;



function throttle(method, delay, duration) {
    let timer = null;
    let begin = new Date();
    return function() {
        var context = this,
            args = arguments,
            current = new Date();

        clearTimeout(timer);


        if(current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(() => {
                method.apply(context, args);
            }, delay);
        }
    }

}

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
        p = touch.clientX;

        handler.start && handler.start(touch);

    });

    $body.on('touchmove', (e) => {
        e.preventDefault();

        let touch = e.touches[0];

        touch.pdiffX = Math.abs(touch.clientX - p);
        p = touch.clientX;

        // console.log(touch.pdiffX);
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

    let a = (currentZ + initStageTranslateZ*2) / 3;
    $stage.css({
        transform: `translateZ(${a}px)`
    })
})()

const bodyOnTouchHandler = {};

bodyOnTouchHandler.start = function(touch) {
    stopOrienter = true;
    this.startRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    this.startRotateX = parseFloat(anime.getValue(sliceWrap, 'rotateX'));
}

bodyOnTouchHandler.moving = function(touch) {
    throttle((X) => {

    let rotateY = this.startRotateY - (touch.diffX / (imageNumber * imageWidth) * 360 * 1.5);
    let rotateX = this.startRotateX + (touch.diffY / (imageNumber * imageWidth) * 360 * 1.5);

    if(rotateX > allowRotateX) {
        rotateX = allowRotateX;
    } else if(rotateX < -allowRotateX) {
        rotateX = -allowRotateX;
    }


    $sliceWrap.css({
        transform: `translateZ(${sliceWrapTranslateZ}px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)`,
    });


        requestAnimationFrame(() => {
            let z = parseFloat(anime.getValue(stage, 'translateZ'));



            let tz = z - X * 30;
            let a = (z + tz ) / 2;
            $stage.css({
                transform: `translateZ(${a}px)`
            })
        })

    }, 0, 100)(touch.pdiffX);

    

};


bodyOnTouchHandler.end = function() {
    window.orienterStartRotateX = parseFloat(anime.getValue(sliceWrap, 'rotateX'));
    window.orienterStartRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    stopOrienter = false;
}


bodyMoving(bodyOnTouchHandler);
















