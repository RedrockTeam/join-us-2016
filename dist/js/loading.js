'use strict';

var mask = document.querySelector('.mask');
// mask.style.width = '0';
setTimeout(function () {
    mask.style.width = '465px';
}, 0);

// setTimeout(() => {
window.onload = function () {
    setTimeout(function () {
        document.querySelector('#view').style.display = 'block';
        document.querySelector('.loading-wrap').style.display = 'none';
    }, 3000);
};

// }, 3000)
//# sourceMappingURL=jsmap/loading.js.map
