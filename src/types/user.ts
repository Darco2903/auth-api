import z from "zod";
import { USER_PUBLIC_ID_LENGTH } from "../consts.js";

export const userPublicIdSchema = z
    .string()
    .length(USER_PUBLIC_ID_LENGTH)
    .regex(/^[a-zA-Z0-9]+$/);

const asset = z.string().url().nullable();

const userAssetsSchema = z.object({
    avatar: asset,
});

export type UserAssets = z.infer<typeof userAssetsSchema>;

export const userPublicSchema = z.object({
    public_id: z.string(),
    name: z.string(),
    assets: userAssetsSchema,
    round_border: z.boolean(),
});

export type UserPublic = z.infer<typeof userPublicSchema>;

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

export type User = z.infer<typeof userSchema>;
