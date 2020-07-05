export async function getCoordinatsByCityName(event) {
    if (event) {
        event.preventDefault();
    }

    const city = document.querySelector(`.input`).value;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=99ecf60eb3944fd69770b5c974614a6a`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.results.length === 0) {
        alert(`results not found`);
    } else {
        console.log(data)
        return data;
    }

}

export async function reverseGeocoding(pos, lat, lng) {
    if (pos) {
        const coord = pos.coords;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${coord.latitude}+${coord.longitude}&key=99ecf60eb3944fd69770b5c974614a6a`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } else {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=99ecf60eb3944fd69770b5c974614a6a`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    }
}



export async function getWeatherInfo(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=0faa504995bd4273abe171804200407&q=${city}&days=3`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
}






