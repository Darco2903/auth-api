import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import {
    emailSchema,
    passwordSchema,
    turnstileSchema,
} from "../types/creds.js";
import { tokenSchema } from "../types/token.js";

const c = initContract();

export default c.router({
    passwordRequest: {
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
        },
    },

    passwordReset: {
        method: "POST",
        path: "/password/reset",
        body: z.object({
            password: passwordSchema,
            token: tokenSchema,
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(z.null()),
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
            200: apiSuccess(z.null()),
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
        },
    },

    verifyRequest: {
        method: "POST",
        path: "/verify/request",
        body: z.object({
            email: z.string().email("Invalid email address"),
            turnstile: turnstileSchema,
        }),
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(
                z.literal("INVALID_TURNSTILE"),
                z.literal("Invalid Turnstile")
            ),
        },
    },
});
