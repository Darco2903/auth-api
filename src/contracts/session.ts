import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    getSession: {
        method: "GET",
        path: "/session",
        responses: {
            200: apiSuccess(
                z.object({
                    session: z.string(),
                })
            ),
            400: apiError(z.literal("INVALID_SESSION_ID"), z.literal("Invalid session ID")),
            401: apiError(z.literal("SESSION_NOT_FOUND"), z.literal("Session not found")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },

    refreshSession: {
        method: "GET",
        path: "/refresh",
        responses: {
            200: apiSuccess(z.void()),
            400: apiError(z.literal("INVALID_SESSION_ID"), z.literal("Invalid session ID")),
            401: apiError(z.literal("SESSION_NOT_FOUND"), z.literal("Session not found")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
