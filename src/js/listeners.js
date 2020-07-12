import { getFromStorage, setToStorage } from './storage'
import { setBackgroundImage, getWeatherInfo, getCityName } from './apiRequests';
import { switchTemperature } from './switchTemperature';


let currentLanguage = getFromStorage(`languageForSearch`);

const buttonWithCurrentLanguage = document.querySelector(`.buttons-panel__button-${currentLanguage}`);
buttonWithCurrentLanguage.classList.add(`active`);

let currentTemperatureMeasure = `c`;
if (getFromStorage(`typeOfTemperature`)) {
    currentTemperatureMeasure = getFromStorage(`typeOfTemperature`);
}

const buttonWithCurrentMeasure = document.querySelector(`.buttons-panel__switchTemperatureTo${currentTemperatureMeasure.toUpperCase()}`);
buttonWithCurrentMeasure.classList.add(`active`);



const switchLanguageToEn = document.querySelector(`.buttons-panel__button-en`);
switchLanguageToEn.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `en`);
    getWeatherInfo(null, null, `en`);
    getCityName();
    switchLanguageToEn.classList.add(`active`);
    switchLanguageToRu.classList.remove(`active`);
    switchLanguageToUk.classList.remove(`active`);
})

const switchLanguageToRu = document.querySelector(`.buttons-panel__button-ru`);
switchLanguageToRu.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `ru`);
    getWeatherInfo(null, null, `ru`);
    getCityName();
    switchLanguageToRu.classList.add(`active`);
    switchLanguageToEn.classList.remove(`active`);
    switchLanguageToUk.classList.remove(`active`);
})

const switchLanguageToUk = document.querySelector(`.buttons-panel__button-uk`);
switchLanguageToUk.addEventListener(`click`, () => {
    setToStorage(`languageForSearch`, `uk`);
    getWeatherInfo(null, null, `uk`);
    getCityName();
    switchLanguageToUk.classList.add(`active`);
    switchLanguageToRu.classList.remove(`active`);
    switchLanguageToEn.classList.remove(`active`);
})



const switchTemperatureToF = document.querySelector(`.buttons-panel__switchTemperatureToF`);
switchTemperatureToF.addEventListener(`click`, () => {
    setToStorage(`typeOfTemperature`, `f`);
    switchTemperature(`f`);
    switchTemperatureToF.classList.add(`active`);
    switchTemperatureToC.classList.remove(`active`);
})
const switchTemperatureToC = document.querySelector(`.buttons-panel__switchTemperatureToC`);
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
