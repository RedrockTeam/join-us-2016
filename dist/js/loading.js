'use strict';

var mask = document.querySelector('.mask');
// mask.style.width = '0';
var loadingWrap = document.querySelector('.loading-wrap');

setTimeout(function () {
    mask.style.width = '465px';
}, 0);

window.onload = function () {
    setTimeout(function () {
        anime.speed = .5;
        anime({
            targets: loadingWrap,
            scale: 0
        });
        var view = document.querySelector('#view');

        view.style.display = 'block';
        setTimeout(function () {
            anime({
                targets: view,
                scale: 1
            });
        }, 500);
    }, 3000);
};
//# sourceMappingURL=jsmap/loading.js.map
