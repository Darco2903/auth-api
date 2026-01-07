export * from "./common.js";
import jwt from "jsonwebtoken";
import { type Result, err, ok } from "neverthrow";
import type { CdnAssetTokenData } from "@darco2903/cdn-api/server";
import {
    accessTokenDataDecodedSchema,
    type JWTVerifyError,
    type AccessTokenData,
    type AccessTokenDataDecoded,
    type JWTSignError,
} from "./types/index.js";
import { JWT_ALGORITHM } from "./consts.js";

export async function JWTVerify(
    token: string,
    pubKey: string
): Promise<Result<AccessTokenDataDecoded, JWTVerifyError>> {
    return new Promise((resolve) => {
        jwt.verify(
            token,
            pubKey,
            { algorithms: [JWT_ALGORITHM] },
            (e, decoded) => {
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
            }
        );
    });
}

export async function JWTSign(
    payload: AccessTokenData | CdnAssetTokenData,
    privKey: string,
    expiresIn: number
): Promise<Result<string, JWTSignError>> {
    return new Promise((resolve) => {
        jwt.sign(
            payload,
            privKey,
            {
                algorithm: JWT_ALGORITHM,
                expiresIn: expiresIn,
            },
            (e, token) => {
                if (e || token === undefined) {
                    resolve(
                        err({
                            name: "JsonWebTokenError",
                            message: e?.message ?? "Failed to sign token",
                        })
                    );
                } else {
                    resolve(ok(token));
                }
            }
        );
    });
}
