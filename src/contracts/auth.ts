import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types";

const c = initContract();

export default c.router({
    auth: {
        method: "GET",
        path: "/auth",
        responses: {
            200: apiSuccess(z.void()),
        },
    },

    login: {
        method: "POST",
        path: "/login",
        body: z.object({
            identifier: z
                .string()
                .min(1, "Identifier is required")
                .max(255, "Identifier must be less than 255 characters"),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters long")
                .max(255, "Password must be less than 255 characters"),
            token: z.string().optional(),
        }),
        responses: {
            200: apiSuccess(
                z
                    .object({
                        sessionId: z.string(),
                    })
                    .optional()
            ),
            400: apiError(
                z.literal("INVALID_SESSION_ID"),
                z.literal("Invalid session ID")
            ),
            401: apiError(
                z.literal("SESSION_NOT_FOUND"),
                z.literal("Session not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    logout: {
        method: "POST",
        path: "/logout",
        body: z.void(),
        responses: {
            200: apiSuccess(z.void()),
        },
    },

    register: {
        method: "POST",
        path: "/register",
        body: z.object({
            username: z
                .string()
                .min(3, "Username must be at least 3 characters long"),
            email: z.string().email("Invalid email address"),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters long"),
            token: z.string().optional(),
        }),
        responses: {
            201: apiSuccess(z.void()),
            400: apiError(z.literal("INVALID_REQUEST"), z.string()),
            409: apiError(z.literal("USER_ALREADY_EXISTS"), z.string()),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
