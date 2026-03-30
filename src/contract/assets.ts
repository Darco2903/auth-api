import { initContract, ZodErrorSchema } from "@ts-rest/core";
import z from "zod";
import { apiError, apiSuccess } from "../types.js";
import {
    authHeaderSchema,
    cdnFeedbackHeaderSchema,
    authAssetTypeSchema,
} from "../types/index.js";

const c = initContract();

export default c.router({
    token: {
        method: "POST",
        path: "/assets/token",
        headers: authHeaderSchema,
        body: z.object({
            type: authAssetTypeSchema,
        }),
        responses: {
            200: apiSuccess(
                z.object({
                    cdnToken: z.string(),
                })
            ),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
        },
    },
    update: {
        method: "POST",
        path: "/assets",
        headers: cdnFeedbackHeaderSchema,
        body: c.noBody(),
        responses: {
            204: apiSuccess(c.noBody()),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
    delete: {
        method: "DELETE",
        path: "/assets",
        description: "Delete user avatar picture",
        headers: cdnFeedbackHeaderSchema,
        responses: {
            204: apiSuccess(c.noBody()),
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
