import { getWeatherInfo } from './apiSearch'

export default function weatherDrawing(city, lat, lng, data) {

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

        const windSpeed = document.querySelector(`.wind-speed`);
        windSpeed.innerHTML = `Wind speed: ${data.current.wind_mph}mph`;

        const humidity = document.querySelector(`.humidity`);
        humidity.innerHTML = `Humidity: ${data.current.humidity}`;

        const degreeValue = document.querySelector(`.degree-value`);
        degreeValue.innerHTML = `${data.current.temp_c}`;

        const additionalDays = document.querySelectorAll(`.weather__add-days`);
        additionalDays.forEach((item, i) => {
            const dateElement = item.querySelector(`.weather-date`);
            dateElement.innerHTML = data.forecast.forecastday[i].date;

            const weatherCondition = item.querySelector(`.weather-condition-in-this-day`);
            weatherCondition.innerHTML = data.forecast.forecastday[i].day.condition.text;

            const weatherConditionIco = item.querySelector(`.weather-condition-ico-in-this-day`);
            weatherConditionIco.innerHTML = `<img src=${data.forecast.forecastday[i].day.condition.icon}>`;

            const temperature = item.querySelector(`.temperature_in_this_day`);
            temperature.innerHTML = `${data.forecast.forecastday[i].day.avgtemp_c}`;
        })
    }





}