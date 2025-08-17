import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import {
    authHeaderSchema,
    emailCredentialSchema,
    emailSchema,
    passwordCredentialSchema,
    passwordSchema,
    turnstileSchema,
    usernameSchema,
} from "../types/creds.js";
import { tokenDataDecodedSchema } from "../types/token.js";
import { accessRefreshSchema } from "../types/auth.js";

const c = initContract();

export default c.router({
    auth: {
        method: "POST",
        path: "/auth/check",
        headers: authHeaderSchema,
        body: z.undefined(),
        responses: {
            200: apiSuccess(
                z.union([
                    z.object({
                        result: z.literal(true),
                        data: tokenDataDecodedSchema,
                    }),
                    z.object({
                        result: z.literal(false),
                        data: z.undefined(),
                    }),
                ])
            ),
        },
    },

    publicKey: {
        method: "GET",
        path: "/auth/public-key",
        responses: {
            200: apiSuccess(
                z.object({
                    publicKey: z.string(),
                })
            ),
        },
    },

    login: {
        method: "POST",
        path: "/login",
        body: z.object({
            email: emailCredentialSchema,
            password: passwordCredentialSchema,
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(accessRefreshSchema),
            400: ZodErrorSchema,
            401: z.union([
                apiError(
                    z.literal("CREDENTIALS_INVALID"),
                    z.literal("Invalid Credentials")
                ),
                apiError(
                    z.literal("INVALID_TURNSTILE"),
                    z.literal("Invalid Turnstile")
                ),
            ]),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    refresh: {
        method: "POST",
        path: "/refresh",
        body: z
            .object({
                refreshToken: z.string(),
            })
            .optional(),
        responses: {
            200: apiSuccess(accessRefreshSchema),
            400: z.union([
                apiError(
                    z.literal("INVALID_REQUEST"),
                    z.literal("Missing refresh token")
                ),
                ZodErrorSchema,
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    logout: {
        method: "POST",
        path: "/logout",
        body: z
            .object({
                refreshToken: z.string(),
            })
            .optional(),
        responses: {
            200: z.null(),
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
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(
                z.literal("INVALID_TURNSTILE"),
                z.literal("Invalid Turnstile")
            ),
            409: apiError(
                z.literal("USER_EXISTS"),
                z.literal("User with this email already exists")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
