import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema, cdnFeedbackHeaderSchema } from "../types/jwt.js";

const c = initContract();

export default c.router({
    assetsToken: {
        method: "POST",
        path: "/assets/token",
        headers: authHeaderSchema,
        body: z.object({
            type: z.literal("avatar"),
        }),
        responses: {
            200: apiSuccess(
                z.object({
                    cdnToken: z.string(),
                })
            ),
            400: ZodErrorSchema,
        },
    },
    // assetsUpdate: {
    //     method: "POST",
    //     path: "/assets",
    //     headers: cdnHeaderSchema,
    //     body: cdnAssetsSchema,
    //     responses: {
    //         200: apiSuccess(z.null()),
    //         400: ZodErrorSchema,
    //     },
    // },
    // assetsDelete: {
    //     method: "DELETE",
    //     path: "/assets",
    //     headers: cdnHeaderSchema,
    //     body: cdnAssetsSchema,
    //     responses: {
    //         200: apiSuccess(z.null()),
    //         400: ZodErrorSchema,
    //     },
    // },
    delete: {
        method: "DELETE",
        path: "/assets",
        description: "Delete user avatar picture",
        headers: cdnFeedbackHeaderSchema,
        responses: {
            200: apiSuccess(z.null()),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            404: apiError(z.literal("NOT_FOUND"), z.literal("User not found")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
