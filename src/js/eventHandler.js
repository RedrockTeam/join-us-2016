let orienterStartRotateX = 0;
let orienterStartRotateY = 0;



var throttle = function(fn, delay, mustRunDelay){
 	var timer = null;
 	var t_start;
 	return function(){
 		var context = this, args = arguments, t_curr = +new Date();
 		clearTimeout(timer);
 		if(!t_start){
 			t_start = t_curr;
 		}
 		if(t_curr - t_start >= mustRunDelay){
 			fn.apply(context, args);
 			t_start = t_curr;
 		}
 		else {
 			timer = setTimeout(function(){
 				fn.apply(context, args);
 			}, delay);
 		}
 	};
 };

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

// 以下是重力感应

let first = true;
function orienter(handler) {
    let  o = new Orienter();
    let latitude = 0;
    let longitude = 0;
    let p = 0;
    o.handler = (obj) => {
        if(first) {
            latitude = obj.lat; // 维度
            longitude = obj.lon;// 经度
            first = false;
            handler.start && handler.start({
                Y: latitude,
                X: longitude
            });
            p = longitude;
            return;
        }

        let diffY = obj.lat - latitude;
        let diffX = obj.lon - longitude;
        let pdiffX = Math.abs(longitude - p);

        handler.moving && handler.moving({
            diffX,
            diffY,
            pdiffX
        });
    }
    o.init();
}




orienter({
    start: (pos) => {
        orienterStartRotateX = parseFloat(anime.getValue(sliceWrap, 'rotateX'));
        orienterStartRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'))
    }, 

    moving: throttle((pos) => {

        if(stopOrienter === true) {
            first = true;    
            return;
        }


        let rotateX = orienterStartRotateX + (pos.diffY/2);
        let rotateY = orienterStartRotateY - pos.diffX;
        let X = pos.pdiffX;

        if(rotateX > 40) {
            rotateX = 40;
        } else if(rotateX < -40) {
            rotateX = -40;
        }

        $sliceWrap.css({ 
            transform: `translateZ(${sliceWrapTranslateZ}px)  
                        rotateX(${rotateX}deg) 
                        rotateY(${rotateY}deg)`,
        })


        requestAnimationFrame(() => {
            let z = parseFloat(anime.getValue(stage, 'translateZ'));

            let tz = z - X * 3;
            let a = (z + tz ) / 2;
            $stage.css({
                transform: `translateZ(${a}px)`
            })
        })
    
    }, 1000/60, 500)

});

























