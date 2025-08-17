import { z } from "zod";

export const userIdSchema = z.string().nonempty("User ID is required");

export const userPublicSchema = z.object({
    public_id: z.string(),
    name: z.string(),
    profile_picture: z.string().nullable(),
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
