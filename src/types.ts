import { z, ZodType } from "zod";

export const apiSuccess = <T>(schema: ZodType<T>) => schema;

export const apiError = <T, U>(code: ZodType<T>, error: ZodType<U>) =>
    z.object({
        code,
        error,
    });

export const tokenSchema = z.string().min(1, "Token is required");
export const userIdSchema = z.string().min(1, "User ID is required");

export const roleSchema = z.object({
    description: z.string(),
    // id: z.number().int().optional(),
    level: z.number().int().min(0).max(255),
    name: z.string(),
});

export const userPublicSchema = z.object({
    public_id: z.string(),
    name: z.string(),
    profile_picture: z.string(),
    round_border: z.boolean(),
});

export const userSchema = userPublicSchema.extend({
    // id: z.number().int().optional(),
    role: roleSchema,
    email: z.string().email(),
    // password_hash: z.string().optional(),
    verified: z.boolean(),
    last_login: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    email_verif: z.string(),
    password_reset: z.string(),
});

export const sessionSchema = z.object({
    created_at: z.string(),
    expires_at: z.string(),
    updated_at: z.string(),
});
