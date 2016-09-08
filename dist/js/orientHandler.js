'use strict';

var first = true;
function orienter(handler) {
    var o = new Orienter();
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
    start: function start(pos) {
        orienterStartRotateX = parseFloat(anime.getValue(sliceWrap, 'rotateX'));
        orienterStartRotateY = parseFloat(anime.getValue(sliceWrap, 'rotateY'));
    },
    moving: function moving(pos) {

        if (stopOrienter === true) {
            first = true;
            return;
        }
        var rotateX = orienterStartRotateX + pos.diffY / 2;
        var rotateY = orienterStartRotateY - pos.diffX;

        if (rotateX > 40) {
            rotateX = 40;
        } else if (rotateX < -40) {
            rotateX = -40;
        }

        $sliceWrap.css({
            transform: 'translateZ(' + sliceWrapTranslateZ + 'px)  \n                        rotateX(' + rotateX + 'deg) \n                        rotateY(' + rotateY + 'deg)'
        });

        $('#test').html('diffX=' + pos.diffX + '<br>diffY=' + pos.diffY);
    }
});
//# sourceMappingURL=jsmap/orientHandler.js.map
