const API_ORIGIN = "https://auth.darco2903.fr";
// const API_ORIGIN = "https://dev.auth.darco2903.fr";
const API_PATH = "/api/v1";
const API_URL = API_ORIGIN + API_PATH;

async function rawFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        credentials: "include",
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

const AuthAPI = {
    auth: () => sendRequestGET("/auth"),
    login: (identifier, password) => sendRequestPOST("/login", { identifier, password }),
    permission: () => sendRequestGET("/permission/"),
    hasPermission: (session_id, level) => sendRequestPOST("/permission", { session_id, level }),
    refresh: () => sendRequestGET("/refresh"),
    session: () => sendRequestGET("/session"),

    user: {
        id: (user_id = "") => sendRequestGET("/user/id/" + user_id),
        session: (session_id = "") => sendRequestGET("/user/session/" + session_id),
        username: (username) => sendRequestPUT("/user/username", { username }),

        picture: {
            profile: {
                get: (user_id = "") => rawFetch(API_URL + "/user/picture/profile/" + user_id).then((res) => res.blob()),
                update: (file, roundBorder) => sendRequestPUT("/user/picture/profile", { file, roundBorder }),
                delete: (roundBorder) => sendRequestDELETE("/user/picture/profile", { roundBorder }),
            },
        },
    },
};

export default AuthAPI;
