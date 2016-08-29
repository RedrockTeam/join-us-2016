
$('.item').each((index, item) => {
    item.style.backgroundImage = `url("./dest/img/${index+1}.png")`;
})