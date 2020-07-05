import { getFromStorage, setToStorage } from './storage'
import weatherDrawing from './weatherDrawing';

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

export async function getWeatherInfo(lat, lng, language) {
    if (!language) {
        language = `en`;
    } else {
        lat = getFromStorage(`lat`);
        lng = getFromStorage(`lng`);
        const url = `https://api.weatherapi.com/v1/forecast.json?key=0faa504995bd4273abe171804200407&lang=${language}&q=${lat},${lng}&days=3`;
        const res = await fetch(url);
        const data = await res.json();
        weatherDrawing(null, null, null, data);
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=0faa504995bd4273abe171804200407&lang=${language}&q=${lat},${lng}&days=3`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}






