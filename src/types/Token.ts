import { z } from "zod";

const JWTData = z.object({
    iat: z.number(),
    exp: z.number(),
});

export const tokenSchema = z.string().nonempty("Token is required");

export const accessTokenDataSchema = z.object({
    public_id: z.string(),
    role: z.number().int().min(-1).max(255).optional(),
    password_reset: z.string().optional(),
});

export const tokenDataDecodedSchema = z.intersection(
    accessTokenDataSchema,
    JWTData
);

export type TokenData = z.infer<typeof accessTokenDataSchema>;
export type TokenDataDecoded = z.infer<typeof tokenDataDecodedSchema>;
