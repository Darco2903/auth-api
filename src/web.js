import { DEFAULT_ORIGIN, API_PATH } from "../config.json";
import ROLES from "./shared/roles.json";

let API_ORIGIN;
let API_URL;

function setApiOrigin(origin = DEFAULT_ORIGIN) {
    try {
        new URL(origin);
    } catch (e) {
        throw new Error("API_ORIGIN is not a valid URL");
    }
    API_ORIGIN = origin;
    API_URL = API_ORIGIN + API_PATH;
}

setApiOrigin(API_ORIGIN);

async function rawFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        credentials: "include",
    });
}

async function apiFetch(url, options) {
    // return rawFetch(url, options).then((res) => {
    //     if (res.status === 200) return res.json();
    //     else return { result: false, error: res.statusText };
    // });
    return rawFetch(url, options)
        .then((res) => {
            switch (res.status) {
                case 502:
                    throw new Error("Could not connect to the server");
            }
            return res.json();
        })
        .catch((e) => ({ result: false, error: e.message }));
}

async function sendRequestGET(endPoint, data) {
    const url = new URL(API_URL + endPoint);
    if (data) Object.entries(data).forEach(([key, value = ""]) => url.searchParams.append(key, value));
    return apiFetch(url);
}

function createFormData(data = {}) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value = ""]) => formData.append(key, value));
    return formData;
}

async function sendRequestPOST(endPoint, data) {
    return apiFetch(API_URL + endPoint, {
        method: "POST",
        body: createFormData(data),
    });
}

async function sendRequestPUT(endPoint, data) {
    return apiFetch(API_URL + endPoint, {
        method: "PUT",
        body: createFormData(data),
    });
}

async function sendRequestDELETE(endPoint, data) {
    return apiFetch(API_URL + endPoint, {
        method: "DELETE",
        body: createFormData(data),
    });
}

export default {
    ROLES,

    auth: () => sendRequestGET("/auth"),
    login: (identifier, password) => sendRequestPOST("/login", { identifier, password }),
    permission: () => sendRequestGET("/permission/"),
    hasPermission: (level) => sendRequestPOST("/permission", { level }),
    refresh: () => sendRequestGET("/refresh"),
    session: () => sendRequestGET("/session"),

    user: {
        getFromId: (user_id = "") => sendRequestGET(`/user/id/${user_id}`),
        getFromSession: (session_id = "") => sendRequestGET(`/user/session/${session_id}`),
        updateUsername: (username) => sendRequestPUT("/user/username", { username }),

        picture: {
            profile: {
                get: (user_id = "") => rawFetch(API_URL + `/user/picture/profile/${user_id}`).then((res) => res.blob()),
                update: (file, roundBorder) => sendRequestPUT("/user/picture/profile", { file, roundBorder }),
                delete: (roundBorder) => sendRequestDELETE("/user/picture/profile", { roundBorder }),
            },
        },
    },

    setApiOrigin,
};
