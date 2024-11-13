const API_ORIGIN = "https://auth.darco2903.fr";
// const API_ORIGIN = "https://dev.auth.darco2903.fr";
const API_PATH = "/api/v1";
const API_URL = API_ORIGIN + API_PATH;

let sessionId = "";

function setSessionId(session_id) {
    sessionId = session_id;
}

async function rawFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: {
            ...options?.headers,
            cookie: sessionId ? `session_id=${sessionId}` : "",
        },
    });
}

async function apiFetch(url, options) {
    return rawFetch(url, options).then((res) => {        
        if (res.status === 200) return res.json();
        else return { result: false, error: res.statusText };
    });
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

module.exports = {
    setSessionId,

    auth: (session_id) => sendRequestGET("/auth", { session_id }),
    login: (identifier, password) => sendRequestPOST("/login", { identifier, password }),
    permission: (session_id = "") => sendRequestGET("/permission/" + session_id),
    hasPermission: (session_id, level) => sendRequestPOST("/permission", { session_id, level }),
    refresh: (session_id) => sendRequestGET("/refresh", { session_id }),
    session: (session_id) => sendRequestGET("/session", { session_id }),

    user: {
        id: (user_id = "") => sendRequestGET("/user/id/" + user_id),
        session: (session_id = "") => sendRequestGET("/user/session/" + session_id),
        username: (username) => sendRequestPUT("/user/username", { username }),

        picture: {
            profile: {
                get: (user_id = "") => rawFetch(API_URL + "/user/picture/profile/" + user_id).then((res) => res.blob()),
                update: (file) => sendRequestPUT("/user/picture/profile", { file }),
                delete: () => sendRequestDELETE("/user/picture/profile"),
            },
        },
    },
};
