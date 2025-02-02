const { DEFAULT_ORIGIN, API_PATH } = require("../config.json");
const ROLES = require("./shared/roles.json");

let API_ORIGIN;
let API_URL;

const env = "node";

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
    return fetch(API_URL + endpoint, {
        ...options,
        headers: {
            ...options?.headers,
            cookie: options?.headers?.cookie ? `${options.headers.cookie}; env=${env}` : `env=${env}`,
        },
    });
}

async function apiFetch(url, options) {
    return rawFetch(url, options)
        .then((res) => {
            switch (res.status) {
                case 502:
                    throw new Error("CONNECTION_ERROR");
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

async function sendRequestPOST(endPoint, data = {}, options = {}) {
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

async function sendRequestPATCH(endPoint, data, options = {}) {
    return apiFetch(endPoint, {
        ...options,
        method: "PATCH",

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

function sessionIdCookie(session_id) {
    return `session_id=${session_id}`;
}

function sessionIdCookieHeader(session_id) {
    return {
        headers: {
            cookie: session_id ? sessionIdCookie(session_id) : "",
        },
    };
}

module.exports = {
    ROLES,

    auth: (session_id) => sendRequestGET("/auth", null, sessionIdCookieHeader(session_id)),

    login: (identifier, password, token) => sendRequestPOST("/login", { identifier, password, token }),
    logout: (session_id = "") => sendRequestPOST("/logout", null, sessionIdCookieHeader(session_id)),
    register: (username, email, password, token) => sendRequestPOST("/register", { username, email, password, token }),

    passwordRequest: (email, token) => sendRequestPOST("/password-request", { email, token }),
    passwordReset: (password, passwordToken, token) => sendRequestPOST("/password-reset", { password, passwordToken, token }),

    verify: (verifToken, token) => sendRequestPOST("/verify", { verifToken, token }),
    verifyRequest: (email, token) => sendRequestPOST("/verify-request", { email, token }),

    permission: {
        get: (session_id = "") => sendRequestGET("/permission/get", null, sessionIdCookieHeader(session_id)),
        has: (session_id = "", level) => sendRequestGET("/permission/has", { level }, sessionIdCookieHeader(session_id)),
    },

    session: {
        get: (session_id) => sendRequestGET("/session", null, sessionIdCookieHeader(session_id)),
        refresh: (session_id) => sendRequestGET("/refresh", null, sessionIdCookieHeader(session_id)),
    },

    user: {
        getFromId: (user_id = "") => sendRequestGET(`/user/id/${user_id}`),

        me: (session_id = "") => sendRequestGET("/user/me", null, sessionIdCookieHeader(session_id)),

        updateEmail: (email, session_id = "", token) => sendRequestPATCH("/user/email", { email, token }, sessionIdCookieHeader(session_id)),
        updatePassword: (password, session_id = "", token) =>
            sendRequestPATCH("/user/password", { password, token }, sessionIdCookieHeader(session_id)),
        updateUsername: (username, session_id = "", token) =>
            sendRequestPATCH("/user/username", { username, token }, sessionIdCookieHeader(session_id)),

        picture: {
            profile: {
                border: (roundBorder, session_id = "") =>
                    sendRequestPOST("/user/picture/profile/border", { roundBorder }, sessionIdCookieHeader(session_id)),
                get: (user_id = "") => rawFetch(`/user/picture/profile/${user_id}`).then((res) => res.blob()),
                update: (file, session_id = "") =>
                    apiFetch("/user/picture/profile", {
                        method: "POST",
                        ...sessionIdCookieHeader(session_id),
                        body: createFormData({ file }),
                    }),
                delete: (session_id) => sendRequestDELETE("/user/picture/profile", null, sessionIdCookieHeader(session_id)),
            },
        },
    },

    setApiOrigin,
};
