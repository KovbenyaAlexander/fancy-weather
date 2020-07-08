import { getFromStorage, setToStorage } from './storage'

export default function timeDrawing(data) {
    console.log(data);
    const offsetMillisec = data.results[0].annotations.timezone.offset_sec * 1000;
    const timeStamp = Math.floor(new Date());
    const currentTimeMS = offsetMillisec + timeStamp;
    const currentTimeSec = Math.floor(currentTimeMS / 1000);
    let time = currentTimeSec % 86400;

    const timeDomElement = document.querySelector(`.weather__time`);
    const dateDomElement = document.querySelector(`.weather__date`);

    const currentTimeStamp = new Date(currentTimeMS);
    const cutrrentYear = currentTimeStamp.getUTCFullYear();
    const cutrrentMonth = currentTimeStamp.getUTCMonth();
    const cutrrentDay = currentTimeStamp.getUTCDate();

    console.log(cutrrentYear);
    console.log(cutrrentMonth);
    console.log(cutrrentDay);

    dateDomElement.innerHTML = `${cutrrentDay}/${cutrrentMonth + 1}/${cutrrentYear}`

    /*
        const monthsEN = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
        const monthsRU = [`январь`, `февраль`, `март`, `апрель`, `май`, `июнь`, `июль`, `август`, `сентябрь`, `октябрь`, `ноябрь`, `декабрь`];
        const monthsUK = [`Січень`, `Лютий`, `Березень`, `Квітень`, `Травень`, `Червень`, `Липень`, `Серпень`, `Вересень`, `Жовтень`, `Листопад`, `Грудень`];
    
        const daysOfWeekEN = [`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`];
        const daysOfWeekRU = [`Понедельник`, `Вторник`, `Среда`, `Четверг`, `Пятница`, `Суббота`, `Воскресенье`];
        const daysOfWeekUK = [`Понеділок`, `Вівторок`, `Середа`, `Четвер`, `П'ятниця`, `Субота`, `Неділя`];
    */





    if (getFromStorage(`intervalID`)) {
        clearInterval(getFromStorage(`intervalID`));
    }

    const intervalID = setInterval(() => {

        const hour = Math.floor(time / 3600);
        const minute = Math.floor((time - (hour * 3600)) / 60);
        const sec = Math.floor((time - (hour * 3600) - minute * 60));

        if (sec < 10) {
            if (minute < 10) {
                if (hour < 10) {
                    timeDomElement.innerHTML = `0${hour}:0${minute}:0${sec}`;
                } else {
                    timeDomElement.innerHTML = `${hour}:0${minute}:0${sec}`;
                }
            } else {
                if (hour < 10) {
                    timeDomElement.innerHTML = `0${hour}:${minute}:0${sec}`;
                } else {
                    timeDomElement.innerHTML = `${hour}:${minute}:0${sec}`;
                }
            }
        } else {
            if (minute < 10) {
                if (hour < 10) {
                    timeDomElement.innerHTML = `0${hour}:0${minute}:${sec}`;
                } else {
                    timeDomElement.innerHTML = `${hour}:0${minute}:${sec}`;
                }
            } else {
                if (hour < 10) {
                    timeDomElement.innerHTML = `0${hour}:${minute}:${sec}`;
                } else {
                    timeDomElement.innerHTML = `${hour}:${minute}:${sec}`;
                }
            }
        }






        time += 1;
    }, 1000)

    setToStorage(`intervalID`, intervalID);
}