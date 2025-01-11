import * as Response from "./types/responses";
import { ROLES } from "./types/roles";

const AuthAPI: {
    ROLES: ROLES;

    auth(session_id: string): Promise<Response.Base>;

    login(identifier: string, password: string): Promise<Response.Login>;

    permission(session_id: string): Promise<Response.Permission>;

    hasPermission(session_id: string, level: number): Promise<Response.HasPermission>;

    refresh(session_id: string): Promise<Response.Refresh>;

    session(session_id: string): Promise<Response.Session>;

    user: {
        getFromId(client_id: string): Promise<Response.User>;

        getFromSession(session_id: string): Promise<Response.User>;

        updateUsername(username: string, session_id: string): Promise<Response.UserUpdateUsername>;

        picture: {
            profile: {
                get(client_id: string): Promise<Response.UserPictureProfileGet>;
                update(image: Blob, roundBorder?: boolean, session_id: string): Promise<Response.UserPictureProfileUpdate>;
                delete(roundBorder?: boolean, session_id: string): Promise<Response.UserPictureProfileDelete>;
            };
        };
    };
};

export * as Errors from "./types/errors";
export * as Responses from "./types/responses";
export * as Types from "./types/types";
export = AuthAPI;
