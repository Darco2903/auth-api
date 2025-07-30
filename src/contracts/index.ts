import { initContract } from "@ts-rest/core";
import auth from "./auth";
import permission from "./permission";
import requests from "./requests";
import session from "./session";
import user from "./user";
import userPictureProfile from "./userPictureProfile";

const c = initContract();

export default c.router({
    ...auth,
    ...permission,
    ...requests,
    ...session,
    ...user,
    ...userPictureProfile,
});
