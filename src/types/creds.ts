import { z } from "zod";
import {
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    MAX_EMAIL_LENGTH,
} from "../consts.js";

export const emailSchema = z.string().email().max(MAX_EMAIL_LENGTH);

export const passwordSchema = z
    .string()
    .regex(/[a-z]/) // contains at least one lowercase letter
    .regex(/[A-Z]/) // contains at least one uppercase letter
    .regex(/[0-9]/) // contains at least one number
    // .regex(/[!@#$%^&*()_+]/) // contains at least one special character
    .regex(/[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/) // contains at least one special character
    .min(MIN_PASSWORD_LENGTH)
    .max(MAX_PASSWORD_LENGTH);

export const usernameSchema = z
    .string()
    .min(MIN_NAME_LENGTH)
    .max(MAX_NAME_LENGTH);

export const turnstileSchema = z.string().nonempty();

export const jwtSchema = z.string().regex(/^Bearer \w+$/);

export const authSchema = z.object({
    authorization: z.string(),
});
