import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess, userIdSchema } from "../types.js";

const c = initContract();

export default c.router({
    pictureSetBorder: {
        method: "POST",
        path: "/user/picture/profile/border",
        description: "Set border for user profile picture",
        body: z.object({
            roundBorder: z.boolean(),
        }),
        responses: {
            200: apiSuccess(z.void()),
        },
    },

    pictureGet: {
        method: "GET",
        path: "/user/picture/profile/:userId",
        description: "Get user profile picture",
        pathParams: z.object({
            userId: userIdSchema,
        }),
        responses: {
            200: apiSuccess(z.instanceof(Buffer)),
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
        path: "/user/picture/profile",
        description: "Update user profile picture",
        body: z.object({
            picture: z.instanceof(Buffer),
        }),
        responses: {
            200: apiSuccess(z.void()),
        },
    },

    pictureDelete: {
        method: "DELETE",
        path: "/user/picture/profile",
        description: "Delete user profile picture",
        responses: {
            200: apiSuccess(z.void()),
        },
    },
});
