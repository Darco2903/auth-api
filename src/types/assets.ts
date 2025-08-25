import { z } from "zod";

export const authServiceSchema = z.literal("auth");

export type AuthService = z.infer<typeof authServiceSchema>;

export const authAssetTypeSchema = z.enum(["avatar"]);

export type AuthAssetTypes = z.infer<typeof authAssetTypeSchema>;
