export async function getCoordinatsByCityName(event) {
    if (event) {
        event.preventDefault();
    }

    const city = document.querySelector(`.input`).value;

    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=99ecf60eb3944fd69770b5c974614a6a`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    return data;
}