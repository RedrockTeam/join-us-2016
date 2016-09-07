const mask = document.querySelector('.mask');
const loadingWrap = document.querySelector('.loading-wrap');




window.onload = function() {
    setTimeout(() => {

        mask.style.width = '465px';
        const iframe = document.createElement("iframe");
        iframe.src = "http://file.ih5.cn/?nid=3559220&preview=true&key=c131d7deb5&width=640&title=5L2c5ZOB6aKE6KeI";
        iframe.className = 'iframe';
        iframe.style.display = 'none';
        setTimeout(() => {
            anime({
                targets: loadingWrap,
                scale: 0,
            })
        }, 3000)
        iframe.onload = function (argument) {
            setTimeout(() => {
                loadingWrap.style.display = 'none';
                iframe.style.display = 'block';
            }, 4000)
        }
        document.body.appendChild(iframe); 
        

    }, 1000);
}