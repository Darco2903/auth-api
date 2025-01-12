const { DEFAULT_ORIGIN, API_PATH } = require("../config.json");
const ROLES = require("./shared/roles.json");

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
        headers: {
            ...options?.headers,
            // cookie: sessionId ? `session_id=${sessionId}` : "",
        },
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

async function sendRequestGET(endPoint, data, options = {}) {
    const url = new URL(API_URL + endPoint);
    if (data) Object.entries(data).forEach(([key, value = ""]) => url.searchParams.append(key, value));
    return apiFetch(url, options);
}

function createFormData(data = {}) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value = ""]) => formData.append(key, value));
    return formData;
}

async function sendRequestPOST(endPoint, data, options = {}) {
    return apiFetch(API_URL + endPoint, {
        ...options,
        method: "POST",
        body: createFormData(data),
    });
}

async function sendRequestPUT(endPoint, data, options = {}) {
    return apiFetch(API_URL + endPoint, {
        ...options,
        method: "PUT",
        body: createFormData(data),
    });
}

async function sendRequestDELETE(endPoint, data, options = {}) {
    return apiFetch(API_URL + endPoint, {
        ...options,
        method: "DELETE",
        body: createFormData(data),
    });
}

function sessionIdCookie(session_id) {
    return {
        headers: {
            cookie: session_id ? `session_id=${session_id}` : "",
        },
    };
}

module.exports = {
    ROLES,

    auth: (session_id) => sendRequestGET("/auth", { session_id }),
    login: (identifier, password) => sendRequestPOST("/login", { identifier, password }),

    permission: {
        get: (session_id = "") => sendRequestGET(`/permission/${session_id}`),
        has: (session_id, level) => sendRequestPOST("/permission", { session_id, level }),
    },

    session: {
        get: (session_id) => sendRequestGET("/session", { session_id }),
        refresh: (session_id) => sendRequestGET("/refresh", { session_id }),
    },

    user: {
        getFromId: (user_id = "") => sendRequestGET(`/user/id/${user_id}`),
        getFromSession: (session_id = "") => sendRequestGET(`/user/session/${session_id}`),
        updateUsername: (username, session_id) => sendRequestPUT("/user/username", { username }, sessionIdCookie(session_id)),

        picture: {
            profile: {
                get: (user_id = "") => rawFetch(API_URL + `/user/picture/profile/${user_id}`).then((res) => res.blob()),
                update: (file, roundBorder, session_id) =>
                    sendRequestPUT("/user/picture/profile", { file, roundBorder }, sessionIdCookie(session_id)),
                delete: (roundBorder, session_id) => sendRequestDELETE("/user/picture/profile", { roundBorder }, sessionIdCookie(session_id)),
            },
        },
    },

    setApiOrigin,
};
