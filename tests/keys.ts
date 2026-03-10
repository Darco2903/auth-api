import fs from "fs";
import path from "path";

export const PRIVATE_KEY = fs.readFileSync(
    path.join(import.meta.dirname, "keys/private.pem"),
    "utf-8"
);
export const PUBLIC_KEY = fs.readFileSync(
    path.join(import.meta.dirname, "keys/public.pem"),
    "utf-8"
);
