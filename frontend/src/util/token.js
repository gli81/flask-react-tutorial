
export function getToken() {
    return localStorage.getItem("_auth");
}

export function saveToken(token) {
    return localStorage.setItem("_auth", token);
}

export function removeToken() {
    return localStorage.removeItem("_auth");
}