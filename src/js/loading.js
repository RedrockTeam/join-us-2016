
var mask = document.querySelector('.mask');
// mask.style.width = '0';
let loadingWrap = document.querySelector('.loading-wrap');

setTimeout(() => {
    mask.style.width = '465px'
}, 0);

// setTimeout(() => {
    window.onload = () => {
        setTimeout(() => {
            anime.speed = .5;
            anime({
                targets: loadingWrap,
                scale: 0,
            });
            let view = document.querySelector('#view');
            setTimeout(() => {
                anime({
                    targets: view,
                    scale: 1
                })
            }, 1000);
            view.style.display = 'block';
            
            
        }, 3000)
    }
    
// }, 3000)