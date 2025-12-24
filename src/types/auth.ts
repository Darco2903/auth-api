import z from "zod";

export const accessSchema = z.object({
    accessToken: z.string(),
    expiresIn: z.number().int().positive(),
});

export const accessRefreshSchema = z.object({
    accessToken: z.string(),
    expiresIn: z.number().int().positive(),
    refreshToken: z.string(),
});
