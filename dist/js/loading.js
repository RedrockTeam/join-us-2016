'use strict';

var mask = document.querySelector('.mask');
// mask.style.width = '0';
var loadingWrap = document.querySelector('.loading-wrap');

setTimeout(function () {
    mask.style.width = '465px';
}, 0);

// setTimeout(() => {
window.onload = function () {
    setTimeout(function () {
        anime({
            targets: loadingWrap,
            scale: 0
        });
        var view = document.querySelector('#view');
        setTimeout(function () {
            anime({
                targets: view,
                scale: 1
            });
        }, 1000);
        view.style.display = 'block';
    }, 3000);
};

// }, 3000)
//# sourceMappingURL=jsmap/loading.js.map
