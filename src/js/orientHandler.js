    let first = true;
function orienter(handler) {
    let  o = new Orienter();
    let latitude = 0;
    let longitude = 0;
    o.handler = (obj) => {
        if(first) {
            latitude = obj.lat; // 维度
            longitude = obj.lon;// 经度
            first = false;
            handler.start({
                Y: latitude,
                X: longitude
            });
            return;
        }

        let diffY = obj.lat - latitude;
        let diffX = obj.lon - longitude;
        handler.moving({
            diffX,
            diffY
        });
    }
    o.init();
}

// let orienterStartRotateX = 0;
// let orienterStartRotateY = 0;

orienter({
    start: (pos) => {
        orienterStartRotateX = parseFloat(anime.getValue(stage, 'rotateX'));
        orienterStartRotateY = parseInt(anime.getValue(sliceWrap, 'rotateY'))
    }, 
    moving: (pos) => {

        if(stopOrienter === true) {
            first = true;    
            return;
        }
        let rotateX = orienterStartRotateX + (pos.diffY/2);
        let rotateY = orienterStartRotateY - pos.diffX;

        $sliceWrap.css({ 
            transform: `translateZ(${sliceWrapTranslateZ}px) rotateY(${rotateY}deg)`,
        })


        if(rotateX > 40) {
            rotateX = 40;
        } else if(rotateX < -40) {
            rotateX = -40;
        }

        $stage.css({
            transform: `rotateX(${rotateX}deg) translateZ(${anime.getValue(stage, 'translateZ')})`,
        })


        $('#test').html(`diffX=${pos.diffX}<br>diffY=${pos.diffY}`);

    }
});











