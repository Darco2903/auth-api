type Base = "CONNECTION_ERROR" | "INTERNAL_SERVER_ERROR";

type Env = "ENVIRONMENT_INVALID";

type SessionId = "MISSING_SESSION_ID" | "INVALID_SESSION_ID";

type Turnstile = "TOKEN_INVALID" | "TURNSTILE_INVALID";

type Email = "EMAIL_INVALID" | "EMAIL_TAKEN";

type Password = "PASSWORD_INVALID";

type Username = "USERNAME_INVALID";

export type Auth = Base;

export type HasPermission = Base | "MISSING_LEVEL" | "INVALID_LEVEL";

export type Login = Base | Env | Turnstile | "CREDENTIALS_ERROR" | "CREDENTIALS_INVALID";

export type Logout = Base | Env;

export type Permission = Base;

export type Refresh = Base | SessionId;

export type Register =
    | Base
    | Turnstile
    | Username
    | Email
    | Password
    | "FAILED_TO_CREATE_USER"
    | "FAILED_TO_CREATE_VERIF_TOKEN"
    | "FAILED_TO_SEND_VERIF_EMAIL";

export type UserFromId = Base | "MISSING_PUBLIC_ID";

export type User = Base | SessionId;

export type UserPictureUpdateBorder = Base | SessionId | "MISSING_BORDER" | "INVALID_BORDER";

export type UserPictureProfileDelete = Base | SessionId;

export type UserPictureProfileUpdate = Base | Auth | "IMAGE_REQUIRED" | "IMAGE_DIMENSIONS_TOO_LARGE" | "FILE_TOO_LARGE" | "UNSUPPORTED_FILE_TYPE";

export type UserUpdateEmail = Base | SessionId | Turnstile | Email;

export type UserUpdatePassword = Base | SessionId | Turnstile | Password;

export type UserUpdateUsername = Base | SessionId | Turnstile | Username;
