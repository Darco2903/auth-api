import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    passwordRequest: {
        method: "POST",
        path: "/password-request",
        body: z.object({
            email: z.string().email("Invalid email address"),
            token: z.string().optional(),
        }),
        responses: {
            200: apiSuccess(z.null()),
        },
    },

    passwordReset: {
        method: "POST",
        path: "/password-reset",
        body: z.object({
            password: z
                .string()
                .min(8, "Password must be at least 8 characters long")
                .max(255, "Password must be less than 255 characters"),
            passwordToken: z.string(),
            token: z.string().optional(),
        }),
        responses: {
            200: apiSuccess(z.null()),
        },
    },

    verify: {
        method: "POST",
        path: "/verify",
        body: z.object({
            verifyToken: z.string(),
            token: z.string().optional(),
        }),
        responses: {
            200: apiSuccess(z.null()),
        },
    },

    verifyRequest: {
        method: "POST",
        path: "/verify-request",
        body: z.object({
            email: z.string().email("Invalid email address"),
            token: z.string().optional(),
        }),
        responses: {
            200: apiSuccess(z.null()),
        },
    },
});
