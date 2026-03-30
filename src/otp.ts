import { verify, generate } from "otplib";

export async function generateOTP(secret: string): Promise<string> {
    return generate({ secret });
}

export async function verifyOTP(
    token: string,
    secret: string
): Promise<boolean> {
    return verify({ token, secret }).then((res) => res.valid);
}
