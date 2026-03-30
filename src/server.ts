import jwt from "jsonwebtoken";
import { ResultAsync } from "neverthrow";
import type { Algorithm } from "jsonwebtoken";
import type { Time } from "@darco2903/secondthought";
import type { CdnAssetTokenData } from "@darco2903/cdn-api/server";
import {
    accessTokenDataDecodedSchema,
    type JWTVerifyError,
    type AccessTokenData,
    type AccessTokenDataDecoded,
    type JWTSignError,
} from "./types/index.js";
import { JWT_ALGORITHM, JWT_ALGORITHMS } from "./consts.js";

export * from "./common.js";
export { verifyOTP } from "./otp.js";

export function JWTVerify(
    token: string,
    pubKey: string
): ResultAsync<AccessTokenDataDecoded, JWTVerifyError> {
    return ResultAsync.fromPromise(
        new Promise<AccessTokenDataDecoded>((resolve, reject) => {
            jwt.verify(
                token,
                pubKey,
                { algorithms: JWT_ALGORITHMS as Algorithm[] },
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

/**
 * Sign a JWT token with the given payload and private key, with the specified expiration time.
 * @param expiresIn Expiration time in seconds or a Time object.
 */
export function JWTSign(
    payload: AccessTokenData | CdnAssetTokenData,
    privKey: string,
    expiresIn: number | Time
): ResultAsync<string, JWTSignError> {
    const expiresInSec =
        typeof expiresIn === "number" ? expiresIn : expiresIn.toSecond().time;

    return ResultAsync.fromPromise(
        new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                privKey,
                {
                    algorithm: JWT_ALGORITHM as Algorithm,
                    expiresIn: expiresInSec,
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
