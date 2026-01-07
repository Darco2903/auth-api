import z from "zod";

export const accessSchema = z.object({
    accessToken: z.string(),
    expiresIn: z.number().int().positive(),
});

export const accessRefreshSchema = accessSchema.extend({
    refreshToken: z.string(),
});
