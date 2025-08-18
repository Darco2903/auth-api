import { type TokenDataDecoded } from "./types/index.js";

export async function JWTVerify(
    token: string,
    pubKey: string
): Promise<TokenDataDecoded | undefined> {
    if (typeof window !== "undefined") {
        throw new Error(
            "JWTverify should not be called in the browser context"
        );
    }

    return new Promise<TokenDataDecoded | undefined>(async (resolve) => {
        const jwt = (await import("jsonwebtoken")).default;
        jwt.verify(token, pubKey, (err, decoded) => {
            resolve(err ? undefined : (decoded as TokenDataDecoded));
        });
    });
}
