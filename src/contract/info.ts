import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { apiError, apiSuccess } from "../types.js";

const c = initContract();

export default c.router({
    publicKey: {
        method: "GET",
        path: "/public-key",
        responses: {
            200: apiSuccess(
                z.object({
                    publicKey: z.string(),
                })
            ),
            500: apiError(z.literal("INTERNAL_SERVER_ERROR"), z.string()),
        },
    },
});
