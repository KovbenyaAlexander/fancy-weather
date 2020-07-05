export default function yandexMapInit(lat, lng) {

    const mapElement = document.querySelector(`.map`);
    mapElement.innerHTML = ``;


    ymaps.ready(init);
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [lat, lng],
            zoom: 10
        });
    }
}


