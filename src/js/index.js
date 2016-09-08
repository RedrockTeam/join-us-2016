window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

console.log(requestAnimationFrame);

let $sliceWrap = $('.slice-wrap');
let $stage = $('.stage');

(function init() {
    let str = '';
    for(var i = 1; i <= 24; i++) {
        str += `<div class="slice" style="background-image:url(dist\/img\/slice/${i}.png)"></div>`
    }
    $sliceWrap.html(str);


    let $slices = $sliceWrap.find('.slice');

    $slices.each((index, item) => {
        $(item).css({
            transform: `rotateY(${-360/24*index}deg) 
                        translateZ(-489px) 
                        translateY(460px)`
        });
    });
    $sliceWrap.css({
        transform: 'translateX(370px) translateZ(500px) translateY(-600px) rotateY(200deg)'
    })
}());


let sliceWrap = $sliceWrap[0];
let stage = $stage[0];

let 
    startRotateY = 0,
    startRotateX = 0;


let initTranslateZ = parseInt(anime.getValue(stage, 'translateZ'));

let bodyTouchHandler = {};


bodyTouchHandler.start = (touch) => {
    startRotateX = parseFloat(anime.getValue(stage, 'rotateX'));
    startRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
}

bodyTouchHandler.moving = (touch) => {
    let 
        rotateY = startRotateY - (touch.diffX / 2880 * 360),
        rotateX = startRotateX - (touch.diffY / 2880 * 360);
    


    $sliceWrap.css({
        transform: `translateX(370px) 
                    translateZ(500px) 
                    translateY(-600px) 
                    rotateY(${rotateY}deg)`
    });
    let stageRotateX = anime.getValue(stage, 'rotateX');

    let currentZ = parseFloat(anime.getValue(stage, 'translateZ'));

    let targetZ = currentZ - absoluteValue(touch.diffX);


    let IcanHandlerIt = anime.getValue(stage, 'rotateX');

    $stage.css({
        transform: `rotateX(${IcanHandlerIt}) translateZ(${(targetZ - currentZ) * 2}px)`
    })


    // anime({
    //     targets: stage,
    //     rotateX: stageRotateX,
    //     translateZ: (element, index) => {
    //         // console.log(touch.speed * 100);
    //         return initTranslateZ - Math.log(touch.speed * 1000000) * 100;
    //     }
    // });
    // setTimeout(() => {
    //    anime({
    //        targets: stage,
    //        rotateX: () => {
    //            return anime.getValue(stage, 'rotateX');
    //        },
    //        translateZ: (element, index) => {
    //            return initTranslateZ;
    //        }
    //    }); 
    // }, 100)

    if(rotateX > 40 || rotateX < -40) return;
    let translateZ = anime.getValue(stage, 'translateZ');
    $stage.css({
        transform: `rotateX(${rotateX}deg) translateZ(${(targetZ - currentZ) * 2}px)`
    });

}


(function moveToInitZ() {
    
    requestAnimationFrame(moveToInitZ);
    let currentZ = parseInt(anime.getValue(stage, 'translateZ'));
    let rotateX = anime.getValue(stage, 'rotateX');

    if(currentZ < 0) {
        currentZ /= 2;
        $stage.css({
            transform: `rotateX(${rotateX}) translateZ(${currentZ}px)`,
        })
    }
})()

bodyMoving(bodyTouchHandler);

function bodyMoving(handler) {
    let startX = 0;
    let startY = 0;


    let $body = $('body');

    let time = 0;
    let preTime = 0;


    let preDiffX = 0;

    $body.on('touchstart', (e) => {
        let touch = e.touches[0];

        startX = touch.clientX;
        startY = touch.clientY;

        // console.log(startX);

        touch.movingX = touch.clientX;
        touch.movingY = touch.clientY;


        touch.startX = startX;
        touch.startY = startY;
        handler.start(touch);


        preTime = new Date();
    });

    $body.on('touchmove', (e) => {
        e.preventDefault();

        time = new Date();

        let speed = 0,
            t = time - preTime;
        preTime = time;



        let 
            touch = e.touches[0],
            moveX = touch.clientX,
            moveY = touch.clientY,


            diffX = moveX - startX,
            diffY = moveY - startY;

        touch.moveX = moveX;
        touch.moveY = moveY;

        touch.diffX = diffX;
        touch.diffY = diffY;


        speed = absoluteValue(touch.diffX - preDiffX) / t ;

        preDiffX = touch.diffX;
        touch.speed = speed;
        handler.moving(touch);

    });
    $body.on('touchend', (e) => {
        let touch = e.touches[0];

    })
}

function absoluteValue(v) {
   return v < 0 ? -v : v; 
}



