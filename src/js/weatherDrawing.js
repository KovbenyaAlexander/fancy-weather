import { getWeatherInfo } from './apiSearch'
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
        const town = document.querySelector(`.weather__town`);
        town.innerHTML = `Название города взять из другого апи`;

        const country = document.querySelector(`.weather__country`);
        country.innerHTML = `Название страны взять из другого апи`;

        const time = document.querySelector(`.weather__time`);
        time.innerHTML = `time?`;

        const currentWeather = document.querySelector(`.weather__current-text`);
        currentWeather.innerHTML = data.current.condition.text;

        const weatherIco = document.querySelector(`.weather__ico`);
        weatherIco.innerHTML = `<img src ="${data.current.condition.icon}">`;

        const windSpeedText = document.querySelector(`.wind-speed-text`);
        windSpeedText.innerHTML = `Wind speed:`;

        const windSpeedValue = document.querySelector(`.wind-speed-value`);
        windSpeedValue.innerHTML = `${data.current.wind_mph}`;

        const humidity = document.querySelector(`.humidity`);
        humidity.innerHTML = `Humidity: ${data.current.humidity}`;

        const degreeValue = document.querySelector(`.degree-value`);
        if (typeOfTemperature === `c`) {
            degreeValue.innerHTML = `${data.current.temp_c}`;
        } else {
            degreeValue.innerHTML = `${data.current.temp_f}`;
        }

        const additionalDays = document.querySelectorAll(`.weather__add-days`);
        additionalDays.forEach((item, i) => {
            const dateElement = item.querySelector(`.weather-date`);
            dateElement.innerHTML = data.forecast.forecastday[i].date;

            const weatherCondition = item.querySelector(`.weather-condition-in-this-day`);
            weatherCondition.innerHTML = data.forecast.forecastday[i].day.condition.text;

            const weatherConditionIco = item.querySelector(`.weather-condition-ico-in-this-day`);
            weatherConditionIco.innerHTML = `<img src=${data.forecast.forecastday[i].day.condition.icon}>`;

            const temperature = item.querySelector(`.temperature_in_this_day`);
            if (typeOfTemperature === `c`) {
                temperature.innerHTML = data.forecast.forecastday[i].day.avgtemp_c;
                setToStorage(`dayTemparatureInC${i}`, data.forecast.forecastday[i].day.avgtemp_c);
                setToStorage(`dayTemparatureInF${i}`, data.forecast.forecastday[i].day.avgtemp_f);
            } else {
                temperature.innerHTML = data.forecast.forecastday[i].day.avgtemp_f;
                setToStorage(`dayTemparatureInC${i}`, data.forecast.forecastday[i].day.avgtemp_c);
                setToStorage(`dayTemparatureInF${i}`, data.forecast.forecastday[i].day.avgtemp_f);
            }

        })

        setToStorage(`currentTemp_C`, data.current.temp_c);
        setToStorage(`currentTemp_F`, data.current.temp_f);
    }


}