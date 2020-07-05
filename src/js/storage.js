export function setToStorage(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
}

export function getFromStorage(name) {
    return JSON.parse(window.localStorage.getItem(name));
}
