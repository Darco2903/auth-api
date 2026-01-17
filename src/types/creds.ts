import z from "zod";
import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    EMAIL_MAX_LENGTH,
} from "../consts.js";

export const tokenSchema = z.string().nonempty("Token is required");

const emailSchemaBase = z.string().max(EMAIL_MAX_LENGTH, "Email is too long");

export const emailSchema = emailSchemaBase.email();
export const emailCredentialSchema = emailSchemaBase.email({
    message: "Invalid Credentials",
});

// const REGEX_LOWER = /[a-z]/; // contains at least one lowercase letter
// const REGEX_UPPER = /[A-Z]/; // contains at least one uppercase letter
// const REGEX_NUMBER = /[0-9]/; // contains at least one number
// const REGEX_SPECIAL = /[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/; // contains at least one special character

export const passwordSchema = z
    .string()
    // .regex(REGEX_LOWER, "Password must contain at least one lowercase letter")
    // .regex(REGEX_UPPER, "Password must contain at least one uppercase letter")
    // .regex(REGEX_NUMBER, "Password must contain at least one number")
    // .regex(
    //     REGEX_SPECIAL,
    //     "Password must contain at least one special character"
    // )
    .min(PASSWORD_MIN_LENGTH, "Password is too short")
    .max(PASSWORD_MAX_LENGTH, "Password is too long");

export const passwordCredentialSchema = z.string().superRefine((val, ctx) => {
    // const hasLower = REGEX_LOWER.test(val);
    // const hasUpper = REGEX_UPPER.test(val);
    // const hasNumber = REGEX_NUMBER.test(val);
    // const hasSpecial = REGEX_SPECIAL.test(val);
    const validLength =
        val.length >= PASSWORD_MIN_LENGTH && val.length <= PASSWORD_MAX_LENGTH;

    // if (!(hasLower && hasUpper && hasNumber && hasSpecial && validLength)) {
    if (!validLength) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid Credentials",
        });
    }
});

export const usernameSchema = z
    .string()
    .min(NAME_MIN_LENGTH, "Username is too short")
    .max(NAME_MAX_LENGTH, "Username is too long");

export const turnstileSchema = z
    .string()
    .nonempty({ message: "Turnstile token is required" });
