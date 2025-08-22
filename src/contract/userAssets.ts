import { initContract, ZodErrorSchema } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";
import { authHeaderSchema, cdnFeedbackHeaderSchema } from "../types/jwt.js";
import { userIdSchema } from "../types/user.js";

const c = initContract();

export default c.router({
    pictureGet: {
        method: "GET",
        path: "/user/picture/profile/:userId",
        description: "Get user profile picture",
        pathParams: z.object({
            userId: userIdSchema,
        }),
        responses: {
            200: apiSuccess(z.instanceof(Blob)),
            400: ZodErrorSchema,
            404: apiError(
                z.literal("NOT_FOUND"),
                z.literal("Profile picture not found")
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
            501: apiError(
                z.literal("NOT_IMPLEMENTED"),
                z.literal("Not implemented")
            ),
        },
    },

    // pictureDirectLink: {
    //     method: "GET",
    //     path: "/user/picture/profile/direct",
    //     description: "Get direct link to user profile picture",
    //     responses: {
    //         200: apiSuccess(z.string().url()),
    //     },
    // },

    pictureUpdate: {
        method: "POST",
        path: "/profile/:userPublicId/avatar",
        description: "Update user avatar picture",
        headers: cdnFeedbackHeaderSchema,
        body: z.undefined(),
        responses: {
            200: apiSuccess(z.null()),
            400: ZodErrorSchema,
            401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
            501: apiError(
                z.literal("NOT_IMPLEMENTED"),
                z.literal("Not implemented")
            ),
        },
    },

    // pictureDelete: {
    //     method: "DELETE",
    //     path: "/profile/:userPublicId/avatar",
    //     description: "Delete user avatar picture",
    //     headers: cdnHeaderFeedbackSchema,
    //     responses: {
    //         200: apiSuccess(z.null()),
    //         401: apiError(z.literal("UNAUTHORIZED"), z.literal("Unauthorized")),
    //         404: apiError(z.literal("NOT_FOUND"), z.literal("User not found")),
    //         500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
    //         501: apiError(
    //             z.literal("NOT_IMPLEMENTED"),
    //             z.literal("Not implemented")
    //         ),
    //     },
    // },
});
