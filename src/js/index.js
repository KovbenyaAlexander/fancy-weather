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

let currentLanguage = `en`;
if (getFromStorage(`languageForSearch`)) {
    currentLanguage = getFromStorage(`languageForSearch`);
}

const buttonWithCurrentLanguage = document.querySelector(`.buttons-panel__button-${currentLanguage}`);
buttonWithCurrentLanguage.classList.add(`active`);



let currentTemperatureMeasure = `c`;
if (getFromStorage(`typeOfTemperature`)) {
    currentTemperatureMeasure = getFromStorage(`typeOfTemperature`);
}

console.log(currentTemperatureMeasure.toUpperCase());

const buttonWithCurrentMeasure = document.querySelector(`.switchTemperatureTo${currentTemperatureMeasure.toUpperCase()}`);
buttonWithCurrentMeasure.classList.add(`active`);











const switchLanguageToEn = document.querySelector(`.buttons-panel__button-en`);
const switchLanguageToRu = document.querySelector(`.buttons-panel__button-ru`);
const switchLanguageToUk = document.querySelector(`.buttons-panel__button-uk`);


switchLanguageToEn.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `en`);
    getWeatherInfo(null, null, `en`);
    getCityName();
    switchLanguageToEn.classList.add(`active`);
    switchLanguageToRu.classList.remove(`active`);
    switchLanguageToUk.classList.remove(`active`);
})


switchLanguageToRu.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `ru`);
    getWeatherInfo(null, null, `ru`);
    getCityName();
    switchLanguageToRu.classList.add(`active`);
    switchLanguageToEn.classList.remove(`active`);
    switchLanguageToUk.classList.remove(`active`);
})


switchLanguageToUk.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `uk`);
    getWeatherInfo(null, null, `uk`);
    getCityName();
    switchLanguageToUk.classList.add(`active`);
    switchLanguageToRu.classList.remove(`active`);
    switchLanguageToEn.classList.remove(`active`);
})


const switchTemperatureToF = document.querySelector(`.switchTemperatureToF`);
const switchTemperatureToC = document.querySelector(`.switchTemperatureToC`);

switchTemperatureToF.addEventListener(`click`, () => {
    setToStorage(`typeOfTemperature`, `f`);
    switchTemperature(`f`);
    switchTemperatureToF.classList.add(`active`);
    switchTemperatureToC.classList.remove(`active`);
})


switchTemperatureToC.addEventListener(`click`, () => {
    setToStorage(`typeOfTemperature`, `c`);
    switchTemperature(`c`);
    switchTemperatureToC.classList.add(`active`);
    switchTemperatureToF.classList.remove(`active`);
})

const refreshButton = document.querySelector(`.buttons-panel__refresh`);
refreshButton.addEventListener(`click`, () => {
    setBackgroundImage();
})