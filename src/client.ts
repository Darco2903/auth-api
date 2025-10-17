export * from "./common.js";
import { initClient } from "@ts-rest/core";
import contract from "./contract/index.js";
import { UserRole } from "./roles.js";

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
