import { getFromStorage, setToStorage } from './storage'

export function switchTemperature(typeOfTemperature) {
    const degreeValue = document.querySelector(`.degree-value`);
    if (typeOfTemperature === `c`) {
        degreeValue.innerHTML = getFromStorage(`currentTemp_C`) + `C`;
    } else {
        degreeValue.innerHTML = getFromStorage(`currentTemp_F`) + `F`;
    }

    const additionalDays = document.querySelectorAll(`.weather__add-days`);
    additionalDays.forEach((item, i) => {

        const temperature = item.querySelector(`.temperature_in_this_day`);
        if (typeOfTemperature === `c`) {
            temperature.innerHTML = getFromStorage(`dayTemparatureInC${i}`) + `C`;
        } else {
            temperature.innerHTML = getFromStorage(`dayTemparatureInF${i}`) + `F`;
        }
    })

}
