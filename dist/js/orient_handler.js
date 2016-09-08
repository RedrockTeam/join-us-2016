'use strict';

function orienter(handler) {
    var o = new Orienter();
    var first = true;
    var latitude = 0;
    var longitude = 0;
    o.handler = function (obj) {
        if (first) {
            latitude = obj.lat; // 维度
            longitude = obj.lon; // 经度
            first = false;
            handler.start({
                Y: latitude,
                X: longitude
            });
            return;
        }

        var diffY = obj.lat - latitude;
        var diffX = obj.lon - longitude;
        handler.moving({
            diffX: diffX,
            diffY: diffY
        });
    };
    o.init();
}

orienter({
    start: function start(pos) {},
    moving: function moving(pos) {

        var rotateX = parseFloat(anime.getValue(stage, 'rotateX')) + pos.diffY;

        var rotateY = pos.diffX;

        if (rotateX > 40 || rotateX < -40) {} else {
            $stage.css({
                transform: 'rotateX(' + rotateX + 'deg)'
            });
        }

        sliceWrap.style.transform = 'translateX(370px) translateZ(500px) translateY(-80px) rotateY(' + (touchendRotateY - rotateY) + 'deg)';

        // $('#test').html(`diffX=${pos.diffX}<br>diffY=${pos.diffY}`);
    }
});
//# sourceMappingURL=jsmap/orient_handler.js.map
