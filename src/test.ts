import { JWTVerify } from "./server";

(async () => {
    await JWTVerify("token", "pubKey");
})();
