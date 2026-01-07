import { initContract, ZodErrorSchema } from "@ts-rest/core";
import z from "zod";
import { apiError, apiSuccess } from "../types.js";
import {
    authHeaderSchema,
    accessTokenDataDecodedSchema,
    accessRefreshSchema,
    emailCredentialSchema,
    emailSchema,
    passwordCredentialSchema,
    passwordSchema,
    turnstileSchema,
    usernameSchema,
    totpCodeSchema,
} from "../types/index.js";

const c = initContract();

export default c.router({
    auth: {
        method: "POST",
        path: "/auth/check",
        headers: authHeaderSchema,
        body: c.noBody(),
        responses: {
            200: apiSuccess(
                z.union([
                    z.object({
                        result: z.literal(true),
                        data: accessTokenDataDecodedSchema,
                    }),
                    z.object({
                        result: z.literal(false),
                        data: z.undefined(),
                    }),
                ])
            ),
            // 200: apiSuccess(c.noBody()),
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

    totpSetup: {
        method: "POST",
        path: "/totp/setup",
        headers: authHeaderSchema,
        body: c.noBody(),
        responses: {
            200: apiSuccess(
                z.object({
                    secret: z.string(),
                    otpauthUrl: z.string(),
                })
            ),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    totpSetupConfirm: {
        method: "POST",
        path: "/totp/setup/confirm",
        headers: authHeaderSchema,
        body: z.object({
            totpCode: totpCodeSchema,
        }),
        responses: {
            200: apiSuccess(c.noBody()),
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("TOTP_NOT_SETUP"), z.string()),
                apiError(z.literal("TOTP_INVALID"), z.string()),
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    totpVerify: {
        method: "POST",
        path: "/totp/verify",
        headers: authHeaderSchema,
        body: z.object({
            totpCode: totpCodeSchema,
        }),
        responses: {
            200: apiSuccess(c.noBody()),
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("TOTP_NOT_SETUP"), z.string()),
                apiError(z.literal("TOTP_NOT_REQUIRED"), z.string()),
                apiError(z.literal("TOTP_INVALID"), z.string()),
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
            200: apiSuccess(c.noBody()),
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
            200: apiSuccess(c.noBody()),
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
