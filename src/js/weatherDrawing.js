import { getWeatherInfo, getCityName } from './apiSearch'
import { getFromStorage, setToStorage } from './storage'

export default function weatherDrawing(city, lat, lng, data) {

    let typeOfTemperature;

    if (!getFromStorage(`typeOfTemperature`)) {
        setToStorage(`typeOfTemperature`, `c`);
        typeOfTemperature = `c`;
    } else {
        typeOfTemperature = getFromStorage(`typeOfTemperature`);
    }

    if (!data) {
        data = getWeatherInfo(lat, lng);
        data.then(data => {
            addWeatherInfoInDom(data);
        })
    } else {
        addWeatherInfoInDom(data)
    }

    function addWeatherInfoInDom(data) {

        const response = getCityName();
        response.then(response => {
            const town = document.querySelector(`.weather__town`);
            town.innerHTML = response[0];

            const country = document.querySelector(`.weather__country`);
            country.innerHTML = response[1];
        })



        const currentWeather = document.querySelector(`.weather__current-text`);
        currentWeather.innerHTML = data.current.condition.text;


        const weatherIco = document.querySelector(`.weather__ico`);
        weatherIco.innerHTML = `<img src ="${data.current.condition.icon}" width="256px">`;



        if (getFromStorage(`languageForSearch`) === `ru`) {
            const windSpeedText = document.querySelector(`.wind-speed-text`);
            windSpeedText.innerHTML = `Скорость ветра: ${data.current.wind_mph} м/ч`;

            //const windSpeedValue = document.querySelector(`.wind-speed-value`);
            //windSpeedValue.innerHTML = `${data.current.wind_mph}`;

            //const windSpeedMeasure = document.querySelector(`.wind-speed-measure`);
            //windSpeedMeasure.innerHTML = `м/ч`;

            const humidity = document.querySelector(`.humidity`);
            humidity.innerHTML = `Влажность: ${data.current.humidity}`;

            const coordLat = document.querySelector(`.coordinates_lat`);
            coordLat.innerHTML = `Широта: ${data.location.lat}`;

            const coordLng = document.querySelector(`.coordinates_lng`);
            coordLng.innerHTML = `Долгота: ${data.location.lon}`;


        } else if (getFromStorage(`languageForSearch`) === `uk`) {
            const windSpeedText = document.querySelector(`.wind-speed-text`);
            windSpeedText.innerHTML = `Швидкість вітру: ${data.current.wind_mph} м/ч`;

            //const windSpeedValue = document.querySelector(`.wind-speed-value`);
            //windSpeedValue.innerHTML = `${data.current.wind_mph}`;

            //const windSpeedMeasure = document.querySelector(`.wind-speed-measure`);
            //windSpeedMeasure.innerHTML = `м/ч`;

            const humidity = document.querySelector(`.humidity`);
            humidity.innerHTML = `Вологість: ${data.current.humidity}`;

            const coordLat = document.querySelector(`.coordinates_lat`);
            coordLat.innerHTML = `Широта: ${data.location.lat}`;

            const coordLng = document.querySelector(`.coordinates_lng`);
            coordLng.innerHTML = `Довгота: ${data.location.lon}`;
        } else {
            const windSpeedText = document.querySelector(`.wind-speed-text`);
            windSpeedText.innerHTML = `Wind speed: ${data.current.wind_mph} mph`;

            //const windSpeedValue = document.querySelector(`.wind-speed-value`);
            //windSpeedValue.innerHTML = `${data.current.wind_mph}`;

            //const windSpeedMeasure = document.querySelector(`.wind-speed-measure`);
            //windSpeedMeasure.innerHTML = `mph`;

            const humidity = document.querySelector(`.humidity`);
            humidity.innerHTML = `Humidity: ${data.current.humidity}`;

            const coordLat = document.querySelector(`.coordinates_lat`);
            coordLat.innerHTML = `Latitude: ${data.location.lat}`;

            const coordLng = document.querySelector(`.coordinates_lng`);
            coordLng.innerHTML = `Longitude: ${data.location.lon}`;
        }

        const degreeValue = document.querySelector(`.degree-value`);
        if (typeOfTemperature === `c`) {
            degreeValue.innerHTML = data.current.temp_c + `C`;
        } else {
            degreeValue.innerHTML = data.current.temp_f + `F`;
        }

        const additionalDays = document.querySelectorAll(`.weather__add-days`);
        additionalDays.forEach((item, i) => {
            const dateElement = item.querySelector(`.weather-date`);
            dateElement.innerHTML = data.forecast.forecastday[i].date;

            const weatherCondition = item.querySelector(`.weather-condition-in-this-day`);
            weatherCondition.innerHTML = data.forecast.forecastday[i].day.condition.text;

            const weatherConditionIco = item.querySelector(`.weather-condition-ico-in-this-day`);
            weatherConditionIco.innerHTML = `<img src="${data.forecast.forecastday[i].day.condition.icon}">`;

            const temperature = item.querySelector(`.temperature_in_this_day`);
            if (typeOfTemperature === `c`) {
                temperature.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + `C`;
                setToStorage(`dayTemparatureInC${i}`, data.forecast.forecastday[i].day.avgtemp_c);
                setToStorage(`dayTemparatureInF${i}`, data.forecast.forecastday[i].day.avgtemp_f);
            } else {
                temperature.innerHTML = data.forecast.forecastday[i].day.avgtemp_f + `F`;
                setToStorage(`dayTemparatureInC${i}`, data.forecast.forecastday[i].day.avgtemp_c);
                setToStorage(`dayTemparatureInF${i}`, data.forecast.forecastday[i].day.avgtemp_f);
            }
        })

        setToStorage(`currentTemp_C`, data.current.temp_c);
        setToStorage(`currentTemp_F`, data.current.temp_f);
    }

}