import { z } from "zod";

const JWTData = z.object({
    iat: z.number(),
    exp: z.number(),
});

export const jwtSchema = z.string().startsWith("Bearer ");

///////////////////////////////////

export const authHeaderSchema = z.object({
    authorization: jwtSchema.optional(),
});

export const accessTokenDataSchema = z.object({
    public_id: z.string(),
    role: z.number().int().min(-1).max(255),
    password_reset: z.string().optional(),
});

export const accessTokenDataDecodedSchema = z.intersection(
    accessTokenDataSchema,
    JWTData
);

export type AccessTokenData = z.infer<typeof accessTokenDataSchema>;
export type AccessTokenDataDecoded = z.infer<
    typeof accessTokenDataDecodedSchema
>;

///////////////////////////////////

export const cdnFeedbackHeaderSchema = z.object({
    authorization: jwtSchema.optional(),
});
