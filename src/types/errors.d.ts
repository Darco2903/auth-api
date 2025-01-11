export type Auth = SessionId | "UNAUTHORIZED";

export type LevelRequired = "LEVEL_REQUIRED";

export type Login = "CREDENTIALS_INVALID";

export type NotFound = "SESSION_NOT_FOUND";

export type SessionId = "SESSION_ID_REQUIRED";

export type UserUpdateUsername = Auth | "USERNAME_REQUIRED" | "USERNAME_TOO_SHORT" | "USERNAME_TOO_LONG" | "USERNAME_EXISTS";

export type UserPictureProfileUpdate = Auth | "IMAGE_REQUIRED" | "IMAGE_DIMENSIONS_TOO_LARGE" | "FILE_TOO_LARGE" | "UNSUPPORTED_FILE_TYPE";
