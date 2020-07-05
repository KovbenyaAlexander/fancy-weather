import yandexMapInit from './yandexMap';
import { getCoordinatsByCityName, reverseGeocoding } from './apiSearch';
import weatherDrawing from './weatherDrawing';


navigator.geolocation.getCurrentPosition((coords) => {
    yandexMapInit(coords);
    const currentUserLocation = reverseGeocoding(coords);
    currentUserLocation.then(data => {
        const city = data.results[0].components.city || data.results[0].components.town ||
            data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;

        weatherDrawing(city);
    })
});




const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (e) => {
    const response = getCoordinatsByCityName(e);
    response.then((data) => {
        if (data) {
            const lat = data.results[0].geometry.lat;
            const lng = data.results[0].geometry.lng;
            const mapElement = document.querySelector(`.map`);
            mapElement.innerHTML = ``;
            yandexMapInit(null, lat, lng);



            const currentUserLocation = reverseGeocoding(null, lat, lng);
            currentUserLocation.then(data => {
                const city = data.results[0].components.city || data.results[0].components.town ||
                    data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;

                weatherDrawing(city);
            })
        }

    });
});


