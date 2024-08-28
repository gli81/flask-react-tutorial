
export function getToken() {
    return localStorage.getItem("_auth");
}
export function setToken(name, token) {
    localStorage.setItem(name, token);
}
export function rmToken() {
    localStorage.removeItem("_auth");
}