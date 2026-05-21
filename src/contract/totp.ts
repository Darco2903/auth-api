import { initContract, ZodErrorSchema } from "@ts-rest/core";
import z from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema, totpCodeSchema } from "../types/index.js";

const c = initContract();

export default c.router({
    setup: {
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
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("TOTP_ALREADY_SETUP"), z.string()),
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    setupConfirm: {
        method: "POST",
        path: "/totp/setup/confirm",
        headers: authHeaderSchema,
        body: z.object({
            totpCode: totpCodeSchema,
        }),
        responses: {
            204: apiSuccess(c.noBody()),
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("TOTP_NOT_SETUP"), z.string()),
                apiError(z.literal("TOTP_ALREADY_SETUP"), z.string()),
                apiError(z.literal("TOTP_INVALID"), z.string()),
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    verify: {
        method: "POST",
        path: "/totp/verify",
        headers: authHeaderSchema,
        body: z.object({
            totpCode: totpCodeSchema,
        }),
        responses: {
            204: apiSuccess(c.noBody()),
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

    disable: {
        method: "POST",
        path: "/totp/disable",
        headers: authHeaderSchema,
        body: z.object({
            totpCode: totpCodeSchema,
        }),
        responses: {
            204: apiSuccess(c.noBody()),
            400: z.union([
                ZodErrorSchema,
                apiError(z.literal("TOTP_NOT_SETUP"), z.string()),
                apiError(z.literal("TOTP_INVALID"), z.string()),
            ]),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
