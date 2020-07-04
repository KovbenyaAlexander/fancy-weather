import yandexMapInit from './yandexMap';
import { getCoordinatsByCityName } from './apiSearch';


navigator.geolocation.getCurrentPosition(yandexMapInit);

const searchForm = document.querySelector(".search-form");


searchForm.addEventListener("submit", (e) => {
    const response = getCoordinatsByCityName(e);
    response.then((data) => {
        const lat = data.results[0].geometry.lat;
        const lng = data.results[0].geometry.lng;
        const mapElement = document.querySelector(`.map`);
        mapElement.innerHTML = ``;
        yandexMapInit(null, lat, lng);
    });
});


