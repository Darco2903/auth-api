import { z } from "zod";
import { PUBLIC_ID_LENGTH } from "../consts";

export const userIdSchema = z.string().length(PUBLIC_ID_LENGTH);

const asset = z.string().url().nullable();

const userAssetsSchema = z.object({
    avatar: asset,
});

export const userPublicSchema = z.object({
    public_id: z.string(),
    name: z.string(),
    assets: userAssetsSchema,
    round_border: z.boolean(),
});

export const userSchema = userPublicSchema.extend({
    email: z.string().email(),
    role: z.number().int().min(-1, "Invalid level").max(255, "Invalid level"),
    verified: z.boolean(),
    last_login: z.date().nullable(),
    created_at: z.date(),
    updated_at: z.date(),
    email_verif: z.date().nullable(),
    password_reset: z.date().nullable(),
});

export type UserAssets = z.infer<typeof userAssetsSchema>;
export type UserPublic = z.infer<typeof userPublicSchema>;
export type User = z.infer<typeof userSchema>;
