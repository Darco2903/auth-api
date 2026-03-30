import { initContract } from "@ts-rest/core";
import assets from "./assets.js";
import auth from "./auth.js";
import key from "./key.js";
import totp from "./totp.js";
import requests from "./requests.js";
import user from "./user.js";

const c = initContract();

export default c.router(
    {
        assets,
        ...auth,
        ...key,
        totp,
        ...requests,
        user,
    },
    {
        pathPrefix: "/api/v2",
    }
);
