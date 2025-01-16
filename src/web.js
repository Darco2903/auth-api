import { DEFAULT_ORIGIN, API_PATH } from "../config.json";
import ROLES from "./shared/roles.json";

let API_ORIGIN;
let API_URL;

const env = "web";

function setApiOrigin(origin = DEFAULT_ORIGIN) {
    try {
        new URL(origin);
    } catch (e) {
        throw new Error("API_ORIGIN is not a valid URL");
    }
    API_ORIGIN = origin;
    API_URL = API_ORIGIN + API_PATH;
}

setApiOrigin();

async function rawFetch(endpoint, options = {}) {
    document.cookie = "env=web";
    return fetch(API_URL + endpoint, {
        ...options,
        credentials: "include",
        headers: {
            ...options?.headers,
        },
    });
}

async function apiFetch(url, options) {
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

async function sendRequestGET(endPoint, data, options = {}) {
    const params = new URLSearchParams();
    if (data) {
        Object.entries(data).forEach(([key, value = ""]) => params.append(key, value));
    }
    const path = params.size ? `${endPoint}?${params.toString()}` : endPoint;
    return apiFetch(path, options);
}

async function sendRequestPOST(endPoint, data, options = {}) {
    return apiFetch(endPoint, {
        ...options,
        method: "POST",

        // set x-www-form-urlencoded
        headers: {
            ...options?.headers,
            "Content-Type": data ? "application/json" : "",
        },
        body: JSON.stringify(data),
    });
}

async function sendRequestPUT(endPoint, data, options = {}) {
    return apiFetch(endPoint, {
        ...options,
        method: "PUT",

        // set x-www-form-urlencoded
        headers: {
            ...options?.headers,
            "Content-Type": data ? "application/json" : "",
        },
        body: JSON.stringify(data),
    });
}

async function sendRequestDELETE(endPoint, data, options = {}) {
    return apiFetch(endPoint, {
        ...options,
        method: "DELETE",

        // set x-www-form-urlencoded
        headers: {
            ...options?.headers,
            "Content-Type": data ? "application/json" : "",
        },
        body: JSON.stringify(data),
    });
}

function createFormData(data = {}) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value = ""]) => formData.append(key, value));
    return formData;
}

export default {
    ROLES,

    auth: () => sendRequestGET("/auth"),
    login: (identifier, password) => sendRequestPOST("/login", { identifier, password }),
    logout: () => sendRequestPOST("/logout"),

    permission: {
        get: () => sendRequestGET("/permission/get"),
        has: (level) => sendRequestGET("/permission/has", { level }),
    },

    session: {
        get: () => sendRequestGET("/session"),
        refresh: () => sendRequestGET("/refresh"),
    },

    user: {
        getFromId: (user_id = "") => sendRequestGET(`/user/id/${user_id}`),
        me: () => sendRequestGET("/user/me"),
        updateUsername: (username) => sendRequestPUT("/user/username", { username }),

        picture: {
            profile: {
                border: (roundBorder) => sendRequestPOST("/user/picture/profile/border", { roundBorder }),
                get: (user_id = "") => rawFetch(`/user/picture/profile/${user_id}`).then((res) => res.blob()),
                update: (file) =>
                    apiFetch("/user/picture/profile", {
                        method: "POST",
                        body: createFormData({ file }),
                    }),
                delete: () => sendRequestDELETE("/user/picture/profile"),
            },
        },
    },

    setApiOrigin,
};
