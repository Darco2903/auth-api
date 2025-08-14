import { z } from "zod";
import {
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_NAME_LENGTH,
    MIN_NAME_LENGTH,
    MAX_EMAIL_LENGTH,
} from "../consts.js";

const emailSchemaBase = z.string().max(MAX_EMAIL_LENGTH, "Email is too long");

export const emailSchema = emailSchemaBase.email();
export const emailCredentialSchema = emailSchemaBase.email({
    message: "Invalid Credentials",
});

const REGEX_LOWER = /[a-z]/; // contains at least one lowercase letter
const REGEX_UPPER = /[A-Z]/; // contains at least one uppercase letter
const REGEX_NUMBER = /[0-9]/; // contains at least one number
const REGEX_SPECIAL = /[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/; // contains at least one special character

export const passwordSchema = z
    .string()
    .regex(REGEX_LOWER, "Password must contain at least one lowercase letter")
    .regex(REGEX_UPPER, "Password must contain at least one uppercase letter")
    .regex(REGEX_NUMBER, "Password must contain at least one number")
    .regex(
        REGEX_SPECIAL,
        "Password must contain at least one special character"
    )
    .min(MIN_PASSWORD_LENGTH, "Password is too short")
    .max(MAX_PASSWORD_LENGTH, "Password is too long");

export const passwordCredentialSchema = z.string().superRefine((val, ctx) => {
    const hasLower = REGEX_LOWER.test(val);
    const hasUpper = REGEX_UPPER.test(val);
    const hasNumber = REGEX_NUMBER.test(val);
    const hasSpecial = REGEX_SPECIAL.test(val);
    const validLength =
        val.length >= MIN_PASSWORD_LENGTH && val.length <= MAX_PASSWORD_LENGTH;

    if (!(hasLower && hasUpper && hasNumber && hasSpecial && validLength)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid Credentials",
        });
    }
});

export const usernameSchema = z
    .string()
    .min(MIN_NAME_LENGTH, "Username is too short")
    .max(MAX_NAME_LENGTH, "Username is too long");

export const turnstileSchema = z
    .string()
    .nonempty({ message: "Turnstile token is required" });

export const jwtSchema = z.string().regex(/^Bearer \w+$/);

export const authSchema = z.object({
    authorization: z.string().optional(),
});
