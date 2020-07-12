import { getFromStorage, setToStorage } from './storage'
import weatherDrawing from './weatherDrawing';
import timeDrawing from './timeDrawing';


export async function getCoordinatsByCityName(event) {
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

export async function reverseGeocoding(pos, lat, lng) {

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

export async function getWeatherInfo(lat, lng, isFirstLoadPage) {

    const language = getFromStorage(`languageForSearch`);
    lat = getFromStorage(`lat`);
    lng = getFromStorage(`lng`);

    const url = `https://api.weatherapi.com/v1/forecast.json?key=0faa504995bd4273abe171804200407&lang=${language}&q=${lat},${lng}&days=3`;
    const res = await fetch(url);
    const data = await res.json();

    if (isFirstLoadPage) {
        weatherDrawing(null, null, null, data);
    }

    return data;
}


export async function getCityName() {

    const language = getFromStorage(`languageForSearch`);
    const lat = getFromStorage(`lat`);
    const lng = getFromStorage(`lng`);

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=99ecf60eb3944fd69770b5c974614a6a&language=${language}`;
    const res = await fetch(url);
    const data = await res.json();
    const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village || data.results[0].components.county || data.results[0].components.state;
    const country = data.results[0].components.country;

    timeDrawing(data);

    return [city, country];
}


export async function setBackgroundImage() {

    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature&client_id=i-N82jSOSlLR-RInTOxxRnWEE1E5dKdIndWRh0xTdBw`;
    const res = await fetch(url);
    const data = await res.json();

    /*
    const body = document.querySelector(`.body`);
    body.style.backgroundImage = `url(${data.urls.small})`;
    
    */

    const backgroundContainer = document.querySelector(`.background-container`);
    backgroundContainer.style.backgroundImage = `url(${data.urls.small})`;
}