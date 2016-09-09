let $sliceWrap = $('.slice-wrap'),
    sliceWrap = $sliceWrap[0];

let $stage = $('.stage'),
    stage = $stage[0];

(function(sliceWrap) {
    let str = '';

    for(let i = 1; i <= imageNumber; i ++) {
        str += `<div class="slice" style="background-image:url(dist\/img\/slice/${i}.png)"></div>`;
    }
    $sliceWrap.html(str);
    let $slices = $sliceWrap.find('.slice');

    function calculateR(imageNumber, width) {
        let deg = 360/imageNumber/2;
        return (width/2) / Math.tan( 2 * Math.PI * (deg / 360))-6;
    }
    let R = calculateR(imageNumber, imageWidth);

    $slices.each((index, item) => {

        $(item).css({
            transform: `rotateY(${-360/imageNumber*index}deg) translateZ(-${R}px) translateY(-50px)`
        });
    });

    $sliceWrap.append(`<div class='sky' 
                            style='width: ${1.7*R}px; 
                            height: ${1.7*R}px;
                            background-image: url("dist/img/sky.png");
                            background-size: 100% 100%;
                            transform: rotateX(-90deg) translateZ(-600px) translateX(-50%)'></div>`)


    $sliceWrap.append(`<div class='sky' 
                            style='width: ${2.5*R}px; 
                            height: ${2.5*R}px;
                            background-image: url("dist/img/sky.png");
                            background-size: 100% 100%;
                            transform: rotateX(90deg) translateZ(-600px) translateX(-50%)'></div>`);



    $sliceWrap.append(`<a class="link" href="${signUpLink}" style="
                            z-index: 10000;
                            display: inline-block;
                            width: 200px; 
                            height: 75px;
                            transform: rotateY(-325.429deg) translateZ(-570.891px) translateY(-1787px);"><a>`);



    $sliceWrap.css({
        transform: `translateZ(${sliceWrapTranslateZ}px) rotateY(${sliceWrapRotateY}deg)`
    });

    $stage.css({
        transform: `translateZ(${initStageTranslateZ}px)`
    })

}(sliceWrap));