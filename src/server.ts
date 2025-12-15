export * from "./common.js";
import jwt from "jsonwebtoken";
import { type Result, err, ok } from "neverthrow";
import {
    accessTokenDataDecodedSchema,
    type JWTVerifyError,
    type AccessTokenDataDecoded,
} from "./common.js";

export async function JWTVerify(
    token: string,
    pubKey: string
): Promise<Result<AccessTokenDataDecoded, JWTVerifyError>> {
    return new Promise((resolve) => {
        jwt.verify(token, pubKey, { algorithms: ["RS256"] }, (e, decoded) => {
            if (e) {
                resolve(
                    err({
                        name: e.name as JWTVerifyError["name"],
                        message: e.message,
                    } satisfies JWTVerifyError)
                );
            } else if (decoded === undefined) {
                resolve(
                    err({
                        name: "InvalidToken",
                        message: "Token is undefined",
                    } satisfies JWTVerifyError)
                );
            } else {
                const res = accessTokenDataDecodedSchema.safeParse(decoded);
                if (res.success) {
                    resolve(ok(res.data));
                } else {
                    resolve(
                        err({
                            name: "InvalidTokenData",
                            message: "Invalid token data",
                        } satisfies JWTVerifyError)
                    );
                }
            }
        });
    });
}
