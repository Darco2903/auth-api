export * from "./common.js";
import jwt from "jsonwebtoken";
import { ResultAsync } from "neverthrow";
import type { CdnAssetTokenData } from "@darco2903/cdn-api/server";
import {
    accessTokenDataDecodedSchema,
    type JWTVerifyError,
    type AccessTokenData,
    type AccessTokenDataDecoded,
    type JWTSignError,
} from "./types/index.js";
import { JWT_ALGORITHM } from "./consts.js";

export function JWTVerify(
    token: string,
    pubKey: string
): ResultAsync<AccessTokenDataDecoded, JWTVerifyError> {
    return ResultAsync.fromPromise(
        new Promise<AccessTokenDataDecoded>((resolve, reject) => {
            jwt.verify(
                token,
                pubKey,
                { algorithms: [JWT_ALGORITHM] },
                (e, decoded) => {
                    if (e) {
                        reject({
                            name: e.name as JWTVerifyError["name"],
                            message: e.message,
                        } satisfies JWTVerifyError);
                    } else if (decoded === undefined) {
                        reject({
                            name: "InvalidToken",
                            message: "Token is undefined",
                        } satisfies JWTVerifyError);
                    } else {
                        const res =
                            accessTokenDataDecodedSchema.safeParse(decoded);
                        if (res.success) {
                            resolve(res.data);
                        } else {
                            reject({
                                name: "InvalidTokenData",
                                message: "Invalid token data",
                            } satisfies JWTVerifyError);
                        }
                    }
                }
            );
        }),
        (e) => e as JWTVerifyError
    );
}

export function JWTSign(
    payload: AccessTokenData | CdnAssetTokenData,
    privKey: string,
    expiresIn: number
): ResultAsync<string, JWTSignError> {
    return ResultAsync.fromPromise(
        new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                privKey,
                {
                    algorithm: JWT_ALGORITHM,
                    expiresIn: expiresIn,
                },
                (e, token) => {
                    if (e || token === undefined) {
                        reject({
                            name: "JsonWebTokenError",
                            message: e?.message ?? "Failed to sign token",
                        } satisfies JWTSignError);
                    } else {
                        resolve(token);
                    }
                }
            );
        }),
        (e) => e as JWTSignError
    );
}
