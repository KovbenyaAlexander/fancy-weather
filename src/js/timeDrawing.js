import { getFromStorage, setToStorage } from './storage'

export default function timeDrawing(data) {
    const offsetMillisec = data.results[0].annotations.timezone.offset_sec * 1000;
    const timeStamp = Math.floor(new Date());
    let currentTimeMS = offsetMillisec + timeStamp;
    let currentTimeSec = Math.floor(currentTimeMS / 1000);

    const timeDomElement = document.querySelector(`.weather__time`);
    let time = currentTimeSec % 86400;


    if (getFromStorage(`intervalID`)) {
        clearInterval(getFromStorage(`intervalID`));
    }

    const intervalID = setInterval(() => {

        const hour = Math.floor(time / 3600);
        const minutes = Math.floor((time - (hour * 3600)) / 60);

        timeDomElement.innerHTML = `${hour}:${minutes}`;

        time += 1;
    }, 1000)

    setToStorage(`intervalID`, intervalID);
}