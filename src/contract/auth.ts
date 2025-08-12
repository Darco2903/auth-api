import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import {
    authSchema,
    emailSchema,
    passwordSchema,
    turnstileSchema,
    usernameSchema,
} from "../types/creds.js";

const c = initContract();

export default c.router({
    auth: {
        method: "GET",
        path: "/auth",
        headers: authSchema,
        responses: {
            200: apiSuccess(z.boolean()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    login: {
        method: "POST",
        path: "/login",
        body: z.object({
            email: emailSchema,
            password: passwordSchema,
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(
                z.object({
                    accessToken: z.string(),
                    expiresIn: z.number(),
                    refreshToken: z.string(),
                })
            ),
            400: z.union([
                apiError(
                    z.literal("CREDENTIALS_INVALID"),
                    z.literal("Invalid credentials")
                ),
                apiError(
                    z.literal("INVALID_TURNSTILE"),
                    z.literal("Invalid Turnstile")
                ),
            ]),

            401: apiError(
                z.literal("SESSION_NOT_FOUND"),
                z.literal("Session not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    refresh: {
        method: "POST",
        path: "/refresh",
        body: z.object({
            refreshToken: z.string(),
        }),
        responses: {
            200: apiSuccess(
                z.object({
                    accessToken: z.string(),
                    expiresIn: z.number(),
                    refreshToken: z.string(),
                })
            ),
            400: apiError(z.literal("INVALID_REQUEST"), z.string()),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    refreshToken: {
        method: "POST",
        path: "/refresh/token",
        headers: authSchema,
        body: z.void(),
        responses: {
            200: apiSuccess(
                z.object({
                    accessToken: z.string(),
                    expiresIn: z.number(),
                })
            ),
            400: apiError(z.literal("INVALID_REQUEST"), z.string()),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    logout: {
        method: "POST",
        path: "/logout",
        body: z.object({
            refreshToken: z.string(),
        }),
        responses: {
            200: apiSuccess(z.void()),
        },
    },

    register: {
        method: "POST",
        path: "/register",
        body: z.object({
            username: usernameSchema,
            email: emailSchema,
            password: passwordSchema,
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(z.void()),
            400: z.union([
                apiError(
                    z.literal("INVALID_TURNSTILE"),
                    z.literal("Invalid Turnstile")
                ),
                apiError(z.literal("INVALID_REQUEST"), z.string()),
            ]),
            409: apiError(z.literal("USER_ALREADY_EXISTS"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
