import { getFromStorage, setToStorage } from './storage'

export function switchTemperature(typeOfTemperature) {
    const degreeValue = document.querySelector(`.weather__degree-value`);
    if (typeOfTemperature === `c`) {
        degreeValue.innerHTML = getFromStorage(`currentTemp_C`) + `C`;
    } else {
        degreeValue.innerHTML = getFromStorage(`currentTemp_F`) + `F`;
    }

    const additionalDays = document.querySelectorAll(`.add-weather__cell`);
    additionalDays.forEach((item, i) => {

        const temperature = item.querySelector(`.add-weather__temperature_in_this_day`);
        if (typeOfTemperature === `c`) {
            temperature.innerHTML = getFromStorage(`dayTemparatureInC${i}`) + `C`;
        } else {
            temperature.innerHTML = getFromStorage(`dayTemparatureInF${i}`) + `F`;
        }
    })

}
