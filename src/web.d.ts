import * as Response from "./types/responses";
import { ROLES } from "./types/roles";

const AuthAPI: {
    ROLES: ROLES;

    auth(): Promise<Response.Base>;

    login(identifier: string, password: string): Promise<Response.Login>;

    permission(): Promise<Response.Permission>;

    hasPermission(level: number): Promise<Response.HasPermission>;

    refresh(): Promise<Response.Refresh>;

    session(): Promise<Response.Session>;

    user: {
        getFromId(client_id: string): Promise<Response.User>;

        getFromSession(session_id: string): Promise<Response.User>;

        updateUsername(username: string): Promise<Response.UserUpdateUsername>;

        picture: {
            profile: {
                get(client_id: string): Promise<Response.UserPictureProfileGet>;
                update(image: Blob, roundBorder?: boolean): Promise<Response.UserPictureProfileUpdate>;
                delete(roundBorder?: boolean): Promise<Response.UserPictureProfileDelete>;
            };
        };
    };
};

export * as Errors from "./types/errors";
export * as Responses from "./types/responses";
export * as Types from "./types/types";
export default AuthAPI;
