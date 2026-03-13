export const API_VERSION = "v2";
export const API_PATH_PREFIX = `/api/${API_VERSION}`;

export const JWT_ALGORITHM = "ES256";
export const JWT_ALGORITHMS = [JWT_ALGORITHM, "RS256"];

export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 32;
export const EMAIL_MAX_LENGTH = 255;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72; // bcrypt truncates passwords to 72 characters
export const USER_PUBLIC_ID_LENGTH = 8;
