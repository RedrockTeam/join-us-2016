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

orienter({
    start: (pos) => {
        orienterStartRotateX = parseFloat(anime.getValue(sliceWrap, 'rotateX'));
        orienterStartRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'))
    }, 
    moving: (pos) => {

        if(stopOrienter === true) {
            first = true;    
            return;
        }
        let rotateX = orienterStartRotateX + (pos.diffY/2);
        let rotateY = orienterStartRotateY - pos.diffX;

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




        $('#test').html(`diffX=${pos.diffX}<br>diffY=${pos.diffY}`);

    }
});











