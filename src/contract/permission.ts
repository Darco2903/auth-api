import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    getPermission: {
        method: "GET",
        path: "/permission/get",
        responses: {
            200: apiSuccess(
                z.object({
                    level: z.number().int().min(0).max(255),
                })
            ),
        },
    },

    hasPermission: {
        method: "GET",
        path: "/permission/has",
        query: z.object({
            level: z.number().int().min(0).max(255),
        }),
        responses: {
            200: apiSuccess(
                z.object({
                    result: z.boolean(),
                })
            ),
            400: apiError(
                z.literal("INVALID_LEVEL"),
                z.literal("Invalid level")
            ),
            401: apiError(
                z.literal("SESSION_NOT_FOUND"),
                z.literal("Session not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
