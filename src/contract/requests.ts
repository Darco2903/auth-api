import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiErrorData, apiSuccess } from "../types.js";
import { emailSchema, tokenSchema, turnstileSchema } from "../types/creds.js";
import { accessSchema } from "../types/auth.js";

const c = initContract();

export default c.router({
    passwordResetRequest: {
        method: "POST",
        path: "/password/request",
        body: z.object({
            email: emailSchema,
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(
                z.literal("INVALID_TURNSTILE"),
                z.literal("Invalid Turnstile")
            ),
            429: apiErrorData(
                z.literal("PASSWORD_RESET_WAIT"),
                z.literal(
                    "Please wait before requesting a new password reset email"
                ),
                z.object({
                    retry_after: z.number().int().min(0),
                })
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    passwordReset: {
        method: "POST",
        path: "/password/reset",
        body: z.object({
            token: tokenSchema,
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(accessSchema),
            400: ZodErrorSchema,
            401: z.union([
                apiError(
                    z.literal("INVALID_TURNSTILE"),
                    z.literal("Invalid Turnstile")
                ),
                apiError(
                    z.literal("INVALID_TOKEN"),
                    z.literal("Invalid token")
                ),
            ]),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    verifyRequest: {
        method: "POST",
        path: "/verify/request",
        body: z.object({
            email: emailSchema,
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(
                z.literal("INVALID_TURNSTILE"),
                z.literal("Invalid Turnstile")
            ),
            429: apiErrorData(
                z.literal("EMAIL_VERIF_WAIT"),
                z.literal(
                    "Please wait before requesting a new verification email"
                ),
                z.object({
                    retry_after: z.number().int().min(0),
                })
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    verify: {
        method: "POST",
        path: "/verify",
        body: z.object({
            token: tokenSchema,
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(
                z.object({
                    email: emailSchema,
                })
            ),
            400: ZodErrorSchema,
            401: z.union([
                apiError(
                    z.literal("INVALID_TURNSTILE"),
                    z.literal("Invalid Turnstile")
                ),
                apiError(
                    z.literal("INVALID_TOKEN"),
                    z.literal("Invalid token")
                ),
            ]),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
