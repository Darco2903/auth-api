import { z } from "zod";

export const tokenSchema = z.string().nonempty("Token is required");

export const tokenDataSchema = z.object({
    public_id: z.string(),
    role: z.number(),
});

export const tokenDataDecodedSchema = z.intersection(
    tokenDataSchema,
    z.object({
        iat: z.number(),
        exp: z.number(),
    })
);

export type TokenData = z.infer<typeof tokenDataSchema>;
export type TokenDataDecoded = z.infer<typeof tokenDataDecodedSchema>;
