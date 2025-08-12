import { initContract } from "@ts-rest/core";
import auth from "./auth.js";
import permission from "./permission.js";
import requests from "./requests.js";
import user from "./user.js";
import userPictureProfile from "./userPictureProfile.js";

const c = initContract();

export default c.router(
    {
        ...auth,
        ...permission,
        ...requests,
        ...user,
        ...userPictureProfile,
    },
    {
        pathPrefix: "/api/v2",
    }
);
