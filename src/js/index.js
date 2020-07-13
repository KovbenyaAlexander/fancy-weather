import yandexMapInit from './yandexMap';
import { getCoordinatsByCityName, reverseGeocoding, setBackgroundImage, getWeatherInfo, getCityName } from './apiRequests';
import weatherDrawing from './dataDrawing';
import { getFromStorage, setToStorage } from './storage'
import { switchTemperature } from './switchTemperature'


//setBackgroundImage();

if (!getFromStorage(`languageForSearch`)) {
    setToStorage(`languageForSearch`, `en`);
}

navigator.geolocation.getCurrentPosition((coords) => {

    if (!getFromStorage(`lng`) || !getFromStorage(`lat`)) {
        setToStorage(`lng`, coords.coords.longitude);
        setToStorage(`lat`, coords.coords.latitude);
    }

    yandexMapInit();

    const currentUserLocation = reverseGeocoding(coords);
    currentUserLocation.then(data => {
        const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;
        getWeatherInfo(city, coords.coords.latitude, coords.coords.longitude, true);
    })
});

const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (e) => {
    const response = getCoordinatsByCityName(e);
    response.then((data) => {
        if (data) {
            const lat = data.results[0].geometry.lat;
            const lng = data.results[0].geometry.lng;

            setToStorage(`lng`, lng);
            setToStorage(`lat`, lat);

            yandexMapInit(lat, lng);

            const currentUserLocation = reverseGeocoding(null, lat, lng);
            currentUserLocation.then(data => {
                const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;
                weatherDrawing(city, lat, lng);
            })
        }
    });
});