import { Second } from "@darco2903/secondthought";
import { initClient } from "@ts-rest/core";
import contract from "./contract/index.js";
import { UserRole } from "./roles.js";

export * from "./common.js";
export { generateOTP } from "./otp.js";

export function createClient(origin: string) {
    return initClient(contract, {
        baseUrl: origin,
        credentials: "include",
    });
}

export function getRoleName(level: number): string {
    return UserRole[level] || "Unknown";
}

export function getRoleLevel(name: string): number {
    return UserRole[name as keyof typeof UserRole] || -1;
}

export function accessTokenExpiresAt(): Date | null {
    if (document) {
        const expiresAtCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("expiresAt="))
            ?.split("=")[1];

        if (expiresAtCookie) {
            const expiresAt = Number(expiresAtCookie);
            if (!isNaN(expiresAt)) {
                return new Second(expiresAt).toDate();
            }
        }
    }
    return null;
}
