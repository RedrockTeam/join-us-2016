(function(doc) {

    function randomColor () {
        return '#'+Math.floor(Math.random()*16777215).toString(16); 
    }
    var items = doc.querySelectorAll('.item');
    items = Array.prototype.slice.call(items, 0);

    items.forEach(i => {
        i.style.backgroundColor = randomColor();
    });
}(document));