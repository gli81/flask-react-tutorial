
export function getToken(name) {
    return localStorage.getItem(name);
}
export function setToken(name, token) {
    localStorage.setItem(name, token);
}
export function rmToken(name) {
    localStorage.removeItem(name);
}