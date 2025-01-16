type Base = "INTERNAL_SERVER_ERROR" | "CONNECTION_ERROR";

type Env = "ENVIRONMENT_INVALID";

type SessionId = Base | "MISSING_SESSION_ID" | "INVALID_SESSION_ID";

export type _NotFound = Base | "SESSION_NOT_FOUND";

export type Auth = Base;

export type HasPermission = Base | "MISSING_LEVEL" | "INVALID_LEVEL";

export type Login = Base | Env | "CREDENTIALS_ERROR" | "CREDENTIALS_INVALID";

export type Logout = Base | Env;

export type Permission = Base;

export type Refresh = Base | SessionId;

export type UserFromId = Base | "MISSING_PUBLIC_ID";

export type User = Base | SessionId;

export type UserPictureUpdateBorder = Base | SessionId | "MISSING_BORDER" | "INVALID_BORDER";

export type UserPictureProfileDelete = Base | SessionId;

export type UserPictureProfileUpdate = Base | Auth | "IMAGE_REQUIRED" | "IMAGE_DIMENSIONS_TOO_LARGE" | "FILE_TOO_LARGE" | "UNSUPPORTED_FILE_TYPE";

export type UserUpdateUsername = Base | SessionId | "USERNAME_REQUIRED" | "USERNAME_TOO_SHORT" | "USERNAME_TOO_LONG" | "USERNAME_EXISTS";
