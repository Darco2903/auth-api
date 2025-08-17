import { z } from "zod";

export const accessSchema = z.object({
    accessToken: z.string(),
    expiresIn: z.number(),
    refreshToken: z.string(),
});
