export default function yandexMapInit(pos, lat, lng) {
    if (pos) {
        const crd = pos.coords;
        ymaps.ready(init);
        function init() {
            var myMap = new ymaps.Map("map", {
                center: [crd.latitude, crd.longitude],
                zoom: 10
            });
        }

    } else {
        ymaps.ready(init);
        function init() {
            var myMap = new ymaps.Map("map", {
                center: [lat, lng],
                zoom: 10
            });
        }

    }


}


