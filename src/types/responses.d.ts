import * as Error from "./errors";
import * as Type from "./types";

export type Base = {
    result: boolean;
    error?: string;
};

export type Auth = Base;

export type Login = Base & {
    session_id?: string;
    error?: Error.Login;
};

export type Logout = Base;

export type HasPermission = Base & {
    // error?: Error.Auth | Error.LevelRequired;
    error?: Error.LevelRequired;
};

export type Permission = Base & {
    level: number;
    error?: Error.SessionId;
};

export type Refresh = Base & {
    error?: Error.SessionId | Error.NotFound;
};

export type Session = Base & {
    session: Type.Session;
    error?: Error.SessionId;
};

export type User = Base & {
    user?: Type.User;
};

export type UserPictureProfileDelete = Base & {
    error?: Error.Auth;
};

export type UserPictureProfileGet = Blob;

export type UserPictureProfileUpdate = Base & {
    error?: Error.UserPictureProfileUpdate;
};

export type UserUpdateUsername = Base & {
    error?: Error.UserUpdateUsername;
};
