/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/apiRequests.js":
/*!*******************************!*\
  !*** ./src/js/apiRequests.js ***!
  \*******************************/
/*! exports provided: getCoordinatsByCityName, reverseGeocoding, getWeatherInfo, getCityName, setBackgroundImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCoordinatsByCityName", function() { return getCoordinatsByCityName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseGeocoding", function() { return reverseGeocoding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWeatherInfo", function() { return getWeatherInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCityName", function() { return getCityName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBackgroundImage", function() { return setBackgroundImage; });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");
/* harmony import */ var _dataDrawing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataDrawing */ "./src/js/dataDrawing.js");
/* harmony import */ var _timeDrawing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeDrawing */ "./src/js/timeDrawing.js");



async function getCoordinatsByCityName(event) {
  if (event) {
    event.preventDefault();
  }

  const city = document.querySelector(`.search-form__input`).value;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=99ecf60eb3944fd69770b5c974614a6a`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.results.length === 0) {
    alert(`results not found`);
  } else {
    return data;
  }
}
async function reverseGeocoding(pos, lat, lng) {
  if (pos) {
    const coord = pos.coords;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${coord.latitude}+${coord.longitude}&key=99ecf60eb3944fd69770b5c974614a6a&language=en`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } else {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=99ecf60eb3944fd69770b5c974614a6a&language=en`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
}
async function getWeatherInfo(lat, lng, isFirstLoadPage) {
  const language = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`languageForSearch`);
  lat = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`lat`);
  lng = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`lng`);
  const url = `https://api.weatherapi.com/v1/forecast.json?key=0faa504995bd4273abe171804200407&lang=${language}&q=${lat},${lng}&days=3`;
  const res = await fetch(url);
  const data = await res.json();

  if (isFirstLoadPage) {
    Object(_dataDrawing__WEBPACK_IMPORTED_MODULE_1__["default"])(null, null, null, data);
  }

  return data;
}
async function getCityName() {
  const language = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`languageForSearch`);
  const lat = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`lat`);
  const lng = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`lng`);
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=99ecf60eb3944fd69770b5c974614a6a&language=${language}`;
  const res = await fetch(url);
  const data = await res.json();
  const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;
  const country = data.results[0].components.country;
  Object(_timeDrawing__WEBPACK_IMPORTED_MODULE_2__["default"])(data);
  return [city, country];
}
async function setBackgroundImage() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=i-N82jSOSlLR-RInTOxxRnWEE1E5dKdIndWRh0xTdBw`;
  const res = await fetch(url);
  const data = await res.json();
  const backgroundContainer = document.querySelector(`.background-container`);
  backgroundContainer.style.backgroundImage = `url(${data.urls.small})`;
}

/***/ }),

/***/ "./src/js/dataDrawing.js":
/*!*******************************!*\
  !*** ./src/js/dataDrawing.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return weatherDrawing; });
/* harmony import */ var _apiRequests__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiRequests */ "./src/js/apiRequests.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");


function weatherDrawing(city, lat, lng, data) {
  let typeOfTemperature;

  if (!Object(_storage__WEBPACK_IMPORTED_MODULE_1__["getFromStorage"])(`typeOfTemperature`)) {
    Object(_storage__WEBPACK_IMPORTED_MODULE_1__["setToStorage"])(`typeOfTemperature`, `c`);
    typeOfTemperature = `c`;
  } else {
    typeOfTemperature = Object(_storage__WEBPACK_IMPORTED_MODULE_1__["getFromStorage"])(`typeOfTemperature`);
  }

  if (!data) {
    data = Object(_apiRequests__WEBPACK_IMPORTED_MODULE_0__["getWeatherInfo"])(lat, lng);
    data.then(data => {
      addWeatherInfoInDom(data);
    });
  } else {
    addWeatherInfoInDom(data);
  }

  function addWeatherInfoInDom(data) {
    const response = Object(_apiRequests__WEBPACK_IMPORTED_MODULE_0__["getCityName"])();
    response.then(response => {
      const town = document.querySelector(`.weather__town`);
      town.innerHTML = response[0];
      const country = document.querySelector(`.weather__country`);
      country.innerHTML = response[1];
    });
    const currentWeather = document.querySelector(`.weather__current-text`);
    currentWeather.innerHTML = data.current.condition.text;
    const weatherIco = document.querySelector(`.weather__ico`);
    weatherIco.innerHTML = `<img src ="${data.current.condition.icon}" width="128px">`; //const IMGId = data.current.condition.icon[39] + data.current.condition.icon[40] + data.current.condition.icon[41];
    //const linkOfIMGTemplate = `http://cdn.weatherapi.com/weather/128x128/day/${IMGId}.png`

    if (Object(_storage__WEBPACK_IMPORTED_MODULE_1__["getFromStorage"])(`languageForSearch`) === `ru`) {
      const windSpeedText = document.querySelector(`.weather__wind-speed`);
      windSpeedText.innerHTML = `Скорость ветра: ${data.current.wind_mph} м/ч`;
      const humidity = document.querySelector(`.weather__humidity`);
      humidity.innerHTML = `Влажность: ${data.current.humidity}`;
      const coordLat = document.querySelector(`.coordinates__lat`);
      coordLat.innerHTML = `Широта: ${data.location.lat}`;
      const coordLng = document.querySelector(`.coordinates__lng`);
      coordLng.innerHTML = `Долгота: ${data.location.lon}`;
    } else if (Object(_storage__WEBPACK_IMPORTED_MODULE_1__["getFromStorage"])(`languageForSearch`) === `uk`) {
      const windSpeedText = document.querySelector(`.weather__wind-speed`);
      windSpeedText.innerHTML = `Швидкість вітру: ${data.current.wind_mph} м/ч`;
      const humidity = document.querySelector(`.weather__humidity`);
      humidity.innerHTML = `Вологість: ${data.current.humidity}`;
      const coordLat = document.querySelector(`.coordinates__lat`);
      coordLat.innerHTML = `Широта: ${data.location.lat}`;
      const coordLng = document.querySelector(`.coordinates__lng`);
      coordLng.innerHTML = `Довгота: ${data.location.lon}`;
    } else {
      const windSpeedText = document.querySelector(`.weather__wind-speed`);
      windSpeedText.innerHTML = `Wind speed: ${data.current.wind_mph} mph`;
      const humidity = document.querySelector(`.weather__humidity`);
      humidity.innerHTML = `Humidity: ${data.current.humidity}`;
      const coordLat = document.querySelector(`.coordinates__lat`);
      coordLat.innerHTML = `Latitude: ${data.location.lat}`;
      const coordLng = document.querySelector(`.coordinates__lng`);
      coordLng.innerHTML = `Longitude: ${data.location.lon}`;
    }

    const degreeValue = document.querySelector(`.weather__degree-value`);

    if (typeOfTemperature === `c`) {
      degreeValue.innerHTML = data.current.temp_c + `C`;
    } else {
      degreeValue.innerHTML = data.current.temp_f + `F`;
    }

    const additionalDays = document.querySelectorAll(`.add-weather__cell`);
    additionalDays.forEach((item, i) => {
      const dateElement = item.querySelector(`.add-weather__weather-date`);
      dateElement.innerHTML = data.forecast.forecastday[i].date;
      const weatherCondition = item.querySelector(`.add-weather__weather-condition-in-this-day`);
      weatherCondition.innerHTML = data.forecast.forecastday[i].day.condition.text;
      const weatherConditionIco = item.querySelector(`.add-weather__weather-condition-ico-in-this-day`);
      weatherConditionIco.innerHTML = `<img src="${data.forecast.forecastday[i].day.condition.icon}">`;
      const temperature = item.querySelector(`.add-weather__temperature_in_this_day`);

      if (typeOfTemperature === `c`) {
        temperature.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + `C`;
        Object(_storage__WEBPACK_IMPORTED_MODULE_1__["setToStorage"])(`dayTemparatureInC${i}`, data.forecast.forecastday[i].day.avgtemp_c);
        Object(_storage__WEBPACK_IMPORTED_MODULE_1__["setToStorage"])(`dayTemparatureInF${i}`, data.forecast.forecastday[i].day.avgtemp_f);
      } else {
        temperature.innerHTML = data.forecast.forecastday[i].day.avgtemp_f + `F`;
        Object(_storage__WEBPACK_IMPORTED_MODULE_1__["setToStorage"])(`dayTemparatureInC${i}`, data.forecast.forecastday[i].day.avgtemp_c);
        Object(_storage__WEBPACK_IMPORTED_MODULE_1__["setToStorage"])(`dayTemparatureInF${i}`, data.forecast.forecastday[i].day.avgtemp_f);
      }
    });
    Object(_storage__WEBPACK_IMPORTED_MODULE_1__["setToStorage"])(`currentTemp_C`, data.current.temp_c);
    Object(_storage__WEBPACK_IMPORTED_MODULE_1__["setToStorage"])(`currentTemp_F`, data.current.temp_f);
  }
}

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _yandexMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./yandexMap */ "./src/js/yandexMap.js");
/* harmony import */ var _apiRequests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiRequests */ "./src/js/apiRequests.js");
/* harmony import */ var _dataDrawing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataDrawing */ "./src/js/dataDrawing.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");
/* harmony import */ var _switchTemperature__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./switchTemperature */ "./src/js/switchTemperature.js");





Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["setBackgroundImage"])();

if (!Object(_storage__WEBPACK_IMPORTED_MODULE_3__["getFromStorage"])(`languageForSearch`)) {
  Object(_storage__WEBPACK_IMPORTED_MODULE_3__["setToStorage"])(`languageForSearch`, `en`);
}

navigator.geolocation.getCurrentPosition(coords => {
  if (!Object(_storage__WEBPACK_IMPORTED_MODULE_3__["getFromStorage"])(`lng`) || !Object(_storage__WEBPACK_IMPORTED_MODULE_3__["getFromStorage"])(`lat`)) {
    Object(_storage__WEBPACK_IMPORTED_MODULE_3__["setToStorage"])(`lng`, coords.coords.longitude);
    Object(_storage__WEBPACK_IMPORTED_MODULE_3__["setToStorage"])(`lat`, coords.coords.latitude);
  }

  Object(_yandexMap__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const currentUserLocation = Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["reverseGeocoding"])(coords);
  currentUserLocation.then(data => {
    const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;
    Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["getWeatherInfo"])(city, coords.coords.latitude, coords.coords.longitude, true);
  });
});
const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", e => {
  const response = Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["getCoordinatsByCityName"])(e);
  response.then(data => {
    if (data) {
      const lat = data.results[0].geometry.lat;
      const lng = data.results[0].geometry.lng;
      Object(_storage__WEBPACK_IMPORTED_MODULE_3__["setToStorage"])(`lng`, lng);
      Object(_storage__WEBPACK_IMPORTED_MODULE_3__["setToStorage"])(`lat`, lat);
      Object(_yandexMap__WEBPACK_IMPORTED_MODULE_0__["default"])(lat, lng);
      const currentUserLocation = Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["reverseGeocoding"])(null, lat, lng);
      currentUserLocation.then(data => {
        const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;
        Object(_dataDrawing__WEBPACK_IMPORTED_MODULE_2__["default"])(city, lat, lng);
      });
    }
  });
});

/***/ }),

/***/ "./src/js/listeners.js":
/*!*****************************!*\
  !*** ./src/js/listeners.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");
/* harmony import */ var _apiRequests__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./apiRequests */ "./src/js/apiRequests.js");
/* harmony import */ var _switchTemperature__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./switchTemperature */ "./src/js/switchTemperature.js");



let currentLanguage = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`languageForSearch`);
const buttonWithCurrentLanguage = document.querySelector(`.buttons-panel__button-${currentLanguage}`);
buttonWithCurrentLanguage.classList.add(`active`);
let currentTemperatureMeasure = `c`;

if (Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`typeOfTemperature`)) {
  currentTemperatureMeasure = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`typeOfTemperature`);
}

const buttonWithCurrentMeasure = document.querySelector(`.buttons-panel__switchTemperatureTo${currentTemperatureMeasure.toUpperCase()}`);
buttonWithCurrentMeasure.classList.add(`active`);
const switchLanguageToEn = document.querySelector(`.buttons-panel__button-en`);
switchLanguageToEn.addEventListener(`click`, () => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_0__["setToStorage"])(`languageForSearch`, `en`);
  Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["getWeatherInfo"])(null, null, `en`);
  Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["getCityName"])();
  switchLanguageToEn.classList.add(`active`);
  switchLanguageToRu.classList.remove(`active`);
  switchLanguageToUk.classList.remove(`active`);
});
const switchLanguageToRu = document.querySelector(`.buttons-panel__button-ru`);
switchLanguageToRu.addEventListener(`click`, () => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_0__["setToStorage"])(`languageForSearch`, `ru`);
  Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["getWeatherInfo"])(null, null, `ru`);
  Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["getCityName"])();
  switchLanguageToRu.classList.add(`active`);
  switchLanguageToEn.classList.remove(`active`);
  switchLanguageToUk.classList.remove(`active`);
});
const switchLanguageToUk = document.querySelector(`.buttons-panel__button-uk`);
switchLanguageToUk.addEventListener(`click`, () => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_0__["setToStorage"])(`languageForSearch`, `uk`);
  Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["getWeatherInfo"])(null, null, `uk`);
  Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["getCityName"])();
  switchLanguageToUk.classList.add(`active`);
  switchLanguageToRu.classList.remove(`active`);
  switchLanguageToEn.classList.remove(`active`);
});
const switchTemperatureToF = document.querySelector(`.buttons-panel__switchTemperatureToF`);
switchTemperatureToF.addEventListener(`click`, () => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_0__["setToStorage"])(`typeOfTemperature`, `f`);
  Object(_switchTemperature__WEBPACK_IMPORTED_MODULE_2__["switchTemperature"])(`f`);
  switchTemperatureToF.classList.add(`active`);
  switchTemperatureToC.classList.remove(`active`);
});
const switchTemperatureToC = document.querySelector(`.buttons-panel__switchTemperatureToC`);
switchTemperatureToC.addEventListener(`click`, () => {
  Object(_storage__WEBPACK_IMPORTED_MODULE_0__["setToStorage"])(`typeOfTemperature`, `c`);
  Object(_switchTemperature__WEBPACK_IMPORTED_MODULE_2__["switchTemperature"])(`c`);
  switchTemperatureToC.classList.add(`active`);
  switchTemperatureToF.classList.remove(`active`);
});
const refreshButton = document.querySelector(`.buttons-panel__refresh`);
refreshButton.addEventListener(`click`, () => {
  Object(_apiRequests__WEBPACK_IMPORTED_MODULE_1__["setBackgroundImage"])();
});

/***/ }),

/***/ "./src/js/storage.js":
/*!***************************!*\
  !*** ./src/js/storage.js ***!
  \***************************/
/*! exports provided: setToStorage, getFromStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToStorage", function() { return setToStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFromStorage", function() { return getFromStorage; });
function setToStorage(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}
function getFromStorage(name) {
  return JSON.parse(window.localStorage.getItem(name));
}

/***/ }),

/***/ "./src/js/switchTemperature.js":
/*!*************************************!*\
  !*** ./src/js/switchTemperature.js ***!
  \*************************************/
/*! exports provided: switchTemperature */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchTemperature", function() { return switchTemperature; });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");

function switchTemperature(typeOfTemperature) {
  const degreeValue = document.querySelector(`.weather__degree-value`);

  if (typeOfTemperature === `c`) {
    degreeValue.innerHTML = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`currentTemp_C`) + `C`;
  } else {
    degreeValue.innerHTML = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`currentTemp_F`) + `F`;
  }

  const additionalDays = document.querySelectorAll(`.add-weather__cell`);
  additionalDays.forEach((item, i) => {
    const temperature = item.querySelector(`.add-weather__temperature_in_this_day`);

    if (typeOfTemperature === `c`) {
      temperature.innerHTML = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`dayTemparatureInC${i}`) + `C`;
    } else {
      temperature.innerHTML = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`dayTemparatureInF${i}`) + `F`;
    }
  });
}

/***/ }),

/***/ "./src/js/timeDrawing.js":
/*!*******************************!*\
  !*** ./src/js/timeDrawing.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return timeDrawing; });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");

function timeDrawing(data) {
  const offsetMillisec = data.results[0].annotations.timezone.offset_sec * 1000;
  const timeStamp = Math.floor(new Date());
  const currentTimeMS = offsetMillisec + timeStamp;
  const currentTimeSec = Math.floor(currentTimeMS / 1000);
  let time = currentTimeSec % 86400;
  const timeDomElement = document.querySelector(`.weather__time`);
  const dateDomElement = document.querySelector(`.weather__date`);
  const currentTimeStamp = new Date(currentTimeMS);
  const cutrrentYear = currentTimeStamp.getUTCFullYear();
  const cutrrentMonth = currentTimeStamp.getUTCMonth();
  const cutrrentDay = currentTimeStamp.getUTCDate();
  dateDomElement.innerHTML = `${cutrrentDay}/${cutrrentMonth + 1}/${cutrrentYear}`;
  /*
  TODO: translate day/week/month/ into other languages
        const monthsEN = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
      const monthsRU = [`январь`, `февраль`, `март`, `апрель`, `май`, `июнь`, `июль`, `август`, `сентябрь`, `октябрь`, `ноябрь`, `декабрь`];
      const monthsUK = [`Січень`, `Лютий`, `Березень`, `Квітень`, `Травень`, `Червень`, `Липень`, `Серпень`, `Вересень`, `Жовтень`, `Листопад`, `Грудень`];
  
      const daysOfWeekEN = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`];
      const daysOfWeekRU = [`Понедельник`, `Вторник`, `Среда`, `Четверг`, `Пятница`, `Суббота`, `Воскресенье`];
      const daysOfWeekUK = [`Понеділок`, `Вівторок`, `Середа`, `Четвер`, `П'ятниця`, `Субота`, `Неділя`];
  */

  if (Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`intervalID`)) {
    clearInterval(Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`intervalID`));
  }

  const intervalID = setInterval(() => {
    const hour = Math.floor(time / 3600);
    const minute = Math.floor((time - hour * 3600) / 60);
    const sec = Math.floor(time - hour * 3600 - minute * 60);

    if (sec < 10) {
      if (minute < 10) {
        if (hour < 10) {
          timeDomElement.innerHTML = `0${hour}:0${minute}:0${sec}`;
        } else {
          timeDomElement.innerHTML = `${hour}:0${minute}:0${sec}`;
        }
      } else {
        if (hour < 10) {
          timeDomElement.innerHTML = `0${hour}:${minute}:0${sec}`;
        } else {
          timeDomElement.innerHTML = `${hour}:${minute}:0${sec}`;
        }
      }
    } else {
      if (minute < 10) {
        if (hour < 10) {
          timeDomElement.innerHTML = `0${hour}:0${minute}:${sec}`;
        } else {
          timeDomElement.innerHTML = `${hour}:0${minute}:${sec}`;
        }
      } else {
        if (hour < 10) {
          timeDomElement.innerHTML = `0${hour}:${minute}:${sec}`;
        } else {
          timeDomElement.innerHTML = `${hour}:${minute}:${sec}`;
        }
      }
    }

    time += 1;
  }, 1000);
  Object(_storage__WEBPACK_IMPORTED_MODULE_0__["setToStorage"])(`intervalID`, intervalID);
}

/***/ }),

/***/ "./src/js/yandexMap.js":
/*!*****************************!*\
  !*** ./src/js/yandexMap.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return yandexMapInit; });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/js/storage.js");

function yandexMapInit() {
  const lat = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`lat`);
  const lng = Object(_storage__WEBPACK_IMPORTED_MODULE_0__["getFromStorage"])(`lng`);
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

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!***************************************************************************!*\
  !*** multi ./src/js/index.js ./src/js/listeners.js ./src/scss/style.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/index.js */"./src/js/index.js");
__webpack_require__(/*! ./src/js/listeners.js */"./src/js/listeners.js");
module.exports = __webpack_require__(/*! ./src/scss/style.scss */"./src/scss/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map