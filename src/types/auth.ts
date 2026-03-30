import z from "zod";

export const accessSchema = z.object({
    accessToken: z.string(),
    expiresIn: z.number().int().min(0),
});

export const accessRefreshSchema = accessSchema.extend({
    refreshToken: z.string(),
});

export const accessRefreshPendingSchema = accessSchema.extend({
    refreshToken: z.string().nullable(),
});

export const totpCodeSchema = z.string().min(6).max(6);
