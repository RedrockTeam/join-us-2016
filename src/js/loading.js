
var mask = document.querySelector('.mask');
// mask.style.width = '0';
setTimeout(() => {
    mask.style.width = '465px'
}, 0);

// setTimeout(() => {
    window.onload = () => {
        setTimeout(() => {
            document.querySelector('#view').style.display = 'block';
            document.querySelector('.loading-wrap').style.display = 'none';
            
        }, 3000)
    }
    
// }, 3000)