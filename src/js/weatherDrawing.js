import { getWeatherInfo } from './apiSearch'

export default function weatherDrawing(city, lat, lng) {

    console.log(`---->${city}`);
    console.log(`lat-->${lat}, lng-->${lng}`);

    const data = getWeatherInfo(lat, lng);

    data.then(response => {
        console.log(response);


        const town = document.querySelector(`.weather__town`);
        town.innerHTML = `Название города взять из другого апи`;

        const country = document.querySelector(`.weather__country`);
        country.innerHTML = `Название страны взять из другого апи`;

        const time = document.querySelector(`.weather__time`);
        time.innerHTML = `time?`;

        const currentWeather = document.querySelector(`.weather__current-text`);
        currentWeather.innerHTML = response.current.condition.text;

        const weatherIco = document.querySelector(`.weather__ico`);
        weatherIco.innerHTML = `<img src ="${response.current.condition.icon}">`;

        const windSpeed = document.querySelector(`.wind-speed`);
        windSpeed.innerHTML = `Wind speed: ${response.current.wind_mph}mph`;

        const humidity = document.querySelector(`.humidity`);
        humidity.innerHTML = `Humidity: ${response.current.humidity}`;

        const degreeValue = document.querySelector(`.degree-value`);
        degreeValue.innerHTML = `${response.current.temp_c}`;

        const additionalDays = document.querySelectorAll(`.weather__add-days`);
        additionalDays.forEach((item, i) => {
            const dateElement = item.querySelector(`.weather-date`);
            dateElement.innerHTML = response.forecast.forecastday[i].date;

            const weatherCondition = item.querySelector(`.weather-condition-in-this-day`);
            weatherCondition.innerHTML = response.forecast.forecastday[i].day.condition.text;

            const weatherConditionIco = item.querySelector(`.weather-condition-ico-in-this-day`);
            weatherConditionIco.innerHTML = `<img src=${response.forecast.forecastday[i].day.condition.icon}>`;

            const temperature = item.querySelector(`.temperature_in_this_day`);
            temperature.innerHTML = `${response.forecast.forecastday[i].day.avgtemp_c}`;
        })

    })
}