'use strict';

var mask = document.querySelector('.mask');
// mask.style.width = '0';
var loadingWrap = document.querySelector('.loading-wrap');

setTimeout(function () {
    mask.style.width = '360px';
}, 0);

window.onload = function () {
    mask.style.width = '465px';

    setTimeout(function () {
        anime.speed = .5;
        anime({
            targets: loadingWrap,
            scale: 0
        });
        var view = document.querySelector('#view');

        view.style.visibility = 'visible';
        setTimeout(function () {
            anime({
                targets: view,
                scale: 1
            });
        }, 500);
    }, 3000);
};
//# sourceMappingURL=jsmap/loading.js.map
