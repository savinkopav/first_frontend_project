import http from "./httpService";
import { apiUrl } from  "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(user) {
    const { data: jwt } = await http.post(apiEndpoint, {
        email: user.email,
        password: user.password
    });
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    }
    catch (e) {
        return null;
    }
}

//Need to export const with a value = string
export function getJwt() {
    return localStorage.getItem(tokenKey);
}



