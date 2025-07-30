import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
    apiError,
    apiSuccess,
    tokenSchema,
    userIdSchema,
    userPublicSchema,
    userSchema,
} from "../types";

const c = initContract();

export default c.router({
    userGetFromId: {
        method: "GET",
        path: "/user/id/:userId",
        description: "Get user by ID",
        pathParams: z.object({
            userId: userIdSchema,
        }),
        responses: {
            200: apiSuccess(userPublicSchema),
        },
    },

    userMe: {
        method: "GET",
        path: "/user/me",
        description: "Get current user",
        responses: {
            200: apiSuccess(userSchema),
        },
    },

    userUpdateEmail: {
        method: "PATCH",
        path: "/user/email",
        description: "Update email for current user",
        body: z.object({
            email: z.string().email(),
            token: tokenSchema,
        }),
        responses: {
            200: apiSuccess(userSchema),
        },
    },

    userUpdatePassword: {
        method: "PATCH",
        path: "/user/password",
        description: "Update password for current user",
        body: z.object({
            password: z
                .string()
                .min(6, "Password must be at least 6 characters long"),
            token: tokenSchema,
        }),
        responses: {
            200: apiSuccess(userSchema),
        },
    },

    userUpdateUsername: {
        method: "PATCH",
        path: "/user/username",
        description: "Update username for current user",
        body: z.object({
            username: z
                .string()
                .min(2, "Username must be at least 2 characters long"),
            token: tokenSchema,
        }),
        responses: {
            200: apiSuccess(userSchema),
        },
    },
});
