import yandexMapInit from './yandexMap';
import { getCoordinatsByCityName, reverseGeocoding } from './apiSearch';
import weatherDrawing from './weatherDrawing';
import { getFromStorage, setToStorage } from './storage'
import { getWeatherInfo } from './apiSearch'


navigator.geolocation.getCurrentPosition((coords) => {
    yandexMapInit(coords.coords.latitude, coords.coords.longitude);

    setToStorage(`lng`, coords.coords.longitude);
    setToStorage(`lat`, coords.coords.latitude);

    const currentUserLocation = reverseGeocoding(coords);
    currentUserLocation.then(data => {
        //console.log(data);
        const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;
        weatherDrawing(city, coords.coords.latitude, coords.coords.longitude);
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



const switchLanguageToEn = document.querySelector(`.button-en`);
switchLanguageToEn.addEventListener(`click`, () => {
    getWeatherInfo(null, null, `en`);
})


const switchLanguageToRu = document.querySelector(`.button-ru`);
switchLanguageToRu.addEventListener(`click`, () => {
    getWeatherInfo(null, null, `ru`);
})