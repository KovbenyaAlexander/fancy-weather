import yandexMapInit from './yandexMap';
import { getCoordinatsByCityName, reverseGeocoding, setBackgroundImage } from './apiSearch';
import weatherDrawing from './weatherDrawing';
import { getFromStorage, setToStorage } from './storage'
import { getWeatherInfo, getCityName } from './apiSearch'
import { switchTemperature } from './translate'



//setBackgroundImage();

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


if (!getFromStorage(`languageForSearch`)) {
    setToStorage(`languageForSearch`, `en`);
}


const switchLanguageToEn = document.querySelector(`.button-en`);
switchLanguageToEn.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `en`);
    getWeatherInfo(null, null, `en`);
    getCityName();
})

const switchLanguageToRu = document.querySelector(`.button-ru`);
switchLanguageToRu.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `ru`);
    getWeatherInfo(null, null, `ru`);
    translate(`ru`);
    getCityName();
})

const switchLanguageToUk = document.querySelector(`.button-uk`);
switchLanguageToUk.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `uk`);
    getWeatherInfo(null, null, `uk`);
    translate(`uk`);
    getCityName();
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

const refreshButton = document.querySelector(`.refresh`);
refreshButton.addEventListener(`click`, () => {
    setBackgroundImage();
})

