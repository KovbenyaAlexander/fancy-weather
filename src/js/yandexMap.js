import { getFromStorage, setToStorage } from './storage'


export default function yandexMapInit() {

    const lat = getFromStorage(`lat`);
    const lng = getFromStorage(`lng`);


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


