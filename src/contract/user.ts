import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { userIdSchema, userPublicSchema, userSchema } from "../types/user.js";
import { emailSchema, passwordSchema, usernameSchema } from "../types/creds.js";
import { authHeaderSchema } from "../types/jwt.js";
import userAssets from "./userAssets.js";

const c = initContract();

export default c.router({
    assets: userAssets,
    getFromId: {
        method: "GET",
        path: "/user/id/:userId",
        description: "Get user by ID",
        pathParams: z.object({
            userId: userIdSchema,
        }),
        responses: {
            200: apiSuccess(userPublicSchema),
            400: ZodErrorSchema,
            404: apiError(z.literal("NOT_FOUND"), z.literal("User not found")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    getFromIds: {
        method: "GET",
        path: "/user/ids",
        description: "Get users by IDs",
        query: z.object({
            userIds: z.array(userIdSchema),
        }),
        responses: {
            200: apiSuccess(z.array(userPublicSchema)),
            400: ZodErrorSchema,
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    me: {
        method: "GET",
        path: "/user/me",
        description: "Get current user",
        headers: authHeaderSchema,
        responses: {
            200: apiSuccess(userSchema),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            404: apiError(z.literal("NOT_FOUND"), z.literal("User not found")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    updateEmail: {
        method: "PATCH",
        path: "/user/email",
        description: "Update email for current user",
        headers: authHeaderSchema,
        body: z.object({
            email: emailSchema,
        }),
        responses: {
            200: z.null(),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    updatePassword: {
        method: "PATCH",
        path: "/user/password",
        description: "Update password for current user",
        headers: authHeaderSchema,
        body: z.object({
            password: passwordSchema,
            disconnectAll: z.boolean().default(true),
        }),
        responses: {
            200: z.null(),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    updateUsername: {
        method: "PATCH",
        path: "/user/username",
        description: "Update username for current user",
        headers: authHeaderSchema,
        body: z.object({
            username: usernameSchema,
        }),
        responses: {
            200: z.null(),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    setBorder: {
        method: "POST",
        path: "/user/picture/profile/border",
        description: "Set border for user profile picture",
        headers: authHeaderSchema,
        body: z.object({
            roundBorder: z.boolean(),
        }),
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
