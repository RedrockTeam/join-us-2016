function orienter(handler) {
    let  o = new Orienter();
    let first = true;
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
        
    }, 
    moving: (pos) => {

       
        let rotateX = parseFloat(anime.getValue(stage, 'rotateX')) +  pos.diffY;

        let rotateY = pos.diffX;


        if(rotateX > 40 || rotateX < -40) {
        } else {
            $stage.css({
                transform: `rotateX(${rotateX}deg)`
            })
        }

        sliceWrap.style.transform = `translateX(370px) translateZ(500px) translateY(-80px) rotateY(${touchendRotateY-rotateY}deg)`


        // $('#test').html(`diffX=${pos.diffX}<br>diffY=${pos.diffY}`);

    }
});











