import { initContract } from "@ts-rest/core";
import z from "zod";
import { apiSuccess } from "../types.js";

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
        },
    },
});
