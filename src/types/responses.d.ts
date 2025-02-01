import * as Error from "./errors";
import * as Type from "./types";

export type Base = {
    result: boolean;
    error?: string;
};

export type Auth = Base;

export type LoginWeb = Base & {
    error?: Error.Login;
};

export type LoginNode = LoginWeb & {
    session_id: string;
};

export type Logout = Base & {
    error?: Error.Logout;
};

export type HasPermission = Base & {
    // error?: Error.Auth | Error.LevelRequired;
    error?: Error.HasPermission;
};

export type Permission = Base & {
    level: number;
    error?: Error.Permission;
};

export type Refresh = Base & {
    error?: Error.Refresh;
};

export type Register = Base & {
    error?: Error.Register;
};

export type Session = Base & {
    session: Type.Session;
    error?: Error.SessionId;
};

export type UserFromId = Base & {
    user?: Type.UserPublic;
    error?: Error.UserFromId;
};

export type User = Base & {
    user?: Type.User;
    error?: Error.User;
};

export type UserPictureUpdateBorder = Base & {
    error?: Error.UserPictureUpdateBorder;
};

export type UserPictureProfileDelete = Base & {
    error?: Error.UserPictureProfileDelete;
};

export type UserPictureProfileGet = Blob;

export type UserPictureProfileUpdate = Base & {
    error?: Error.UserPictureProfileUpdate;
};

export type UserUpdateEmail = Base & {
    error?: Error.UserUpdateEmail;
};

export type UserUpdatePassword = Base & {
    error?: Error.UserUpdatePassword;
};

export type UserUpdateUsername = Base & {
    error?: Error.UserUpdateUsername;
};

export type PasswordRequest = Base & {
    error?: Error.PasswordRequest;
};

export type PasswordReset = Base & {
    error?: Error.PasswordReset;
};

export type Verify = Base & {
    error?: Error.Verify;
};

export type VerifyRequest = Base & {
    error?: Error.VerifyRequest;
    time_remaining?: number;
};
