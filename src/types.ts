import { ZodErrorSchema } from "@ts-rest/core";
import { z, ZodType } from "zod";

export const apiSuccess = <T>(schema: ZodType<T>) => schema;

export const apiError = <T, U>(code: ZodType<T>, error: ZodType<U>) =>
    z.object({
        code,
        error,
        name: z.literal("APIError"),
    });

export const tokenSchema = z.string().nonempty("Token is required");
export const userIdSchema = z.string().nonempty("User ID is required");

export const roleSchema = z.object({
    description: z.string(),
    level: z.number().int().min(0, "Invalid level").max(255, "Invalid level"),
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
