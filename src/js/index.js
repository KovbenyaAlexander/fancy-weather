import yandexMapInit from './yandexMap';
import { getCoordinatsByCityName, reverseGeocoding } from './apiSearch';
import weatherDrawing from './weatherDrawing';
import { getFromStorage, setToStorage } from './storage'
import { getWeatherInfo } from './apiSearch'
import { switchTemperature, translate } from './translate'

navigator.geolocation.getCurrentPosition((coords) => {
    yandexMapInit(coords.coords.latitude, coords.coords.longitude);

    setToStorage(`lng`, coords.coords.longitude);
    setToStorage(`lat`, coords.coords.latitude);

    const currentUserLocation = reverseGeocoding(coords);
    currentUserLocation.then(data => {
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




if (!getFromStorage(`languageForSearch`)) {
    setToStorage(`languageForSearch`, `en`);
}







const switchLanguageToEn = document.querySelector(`.button-en`);
switchLanguageToEn.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `en`);
    getWeatherInfo(null, null, `en`);
    translate(`en`);
})


const switchLanguageToRu = document.querySelector(`.button-ru`);
switchLanguageToRu.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `ru`);
    getWeatherInfo(null, null, `ru`);
    translate(`ru`);
})

const switchLanguageToUk = document.querySelector(`.button-uk`);
switchLanguageToUk.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `uk`);
    getWeatherInfo(null, null, `uk`);
    translate(`uk`);
})

const switchTemperatureToF = document.querySelector(`.switchTemperatureToF`);
switchTemperatureToF.addEventListener(`click`, () => {
    setToStorage(`typeOfTemperature`, `f`);
    switchTemperature(`f`);
})

const switchTemperatureToC = document.querySelector(`.switchTemperatureToC`);
switchTemperatureToC.addEventListener(`click`, () => {
    setToStorage(`typeOfTemperature`, `c`);
    switchTemperature(`c`);
})

