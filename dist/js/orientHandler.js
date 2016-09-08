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

// let orienterStartRotateX = 0;
// let orienterStartRotateY = 0;

orienter({
    start: function start(pos) {
        orienterStartRotateX = parseFloat(anime.getValue(stage, 'rotateX'));
        orienterStartRotateY = parseInt(anime.getValue(sliceWrap, 'rotateY'));
    },
    moving: function moving(pos) {

        if (stopOrienter === true) {
            first = true;
            return;
        }
        var rotateX = orienterStartRotateX + pos.diffY / 2;
        var rotateY = orienterStartRotateY - pos.diffX;

        $sliceWrap.css({
            transform: 'translateZ(' + sliceWrapTranslateZ + 'px) rotateY(' + rotateY + 'deg)'
        });

        if (rotateX > 40) {
            rotateX = 40;
        } else if (rotateX < -40) {
            rotateX = -40;
        }

        $stage.css({
            transform: 'rotateX(' + rotateX + 'deg) translateZ(' + anime.getValue(stage, 'translateZ') + ')'
        });

        $('#test').html('diffX=' + pos.diffX + '<br>diffY=' + pos.diffY);
    }
});
//# sourceMappingURL=jsmap/orientHandler.js.map
