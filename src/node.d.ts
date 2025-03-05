import * as Response from "./types/responses";
import { ROLES } from "./types/roles";

const AuthAPI: {
    ROLES: ROLES;

    auth(session_id: string): Promise<Response.Auth>;

    login(identifier: string, password: string, token: string): Promise<Response.LoginNode>;

    logout(session_id: string): Promise<Response.Logout>;

    register(username: string, email: string, password: string, token: string): Promise<Response.Register>;

    passwordRequest(email: string, token: string): Promise<Response.PasswordRequest>;
    passwordReset(password: string, passwordToken: string, token: string): Promise<Response.PasswordReset>;

    verify(token: string): Promise<Response.Verify>;
    // verify(verifyToken: string, token: string): Promise<Response.Verify>;

    verifyRequest(email: string, token: string): Promise<Response.VerifyRequest>;

    permission: {
        get(session_id: string): Promise<Response.Permission>;

        has(session_id: string, level: number): Promise<Response.HasPermission>;
    };

    session: {
        get(session_id: string): Promise<Response.Session>;

        refresh(session_id: string): Promise<Response.Refresh>;
    };

    user: {
        getFromId(client_id: string): Promise<Response.UserFromId>;

        me(session_id: string): Promise<Response.User>;

        updateEmail(email: string, session_id: string, token: string): Promise<Response.UserUpdateEmail>;

        updatePassword(password: string, session_id: string, token: string): Promise<Response.UserUpdatePassword>;

        updateUsername(username: string, session_id: string, token: string): Promise<Response.UserUpdateUsername>;

        picture: {
            profile: {
                border(roundBorder: boolean, session_id: string): Promise<Response.UserPictureUpdateBorder>;

                get(client_id: string): Promise<Response.UserPictureProfileGet>;

                update(image: Blob, session_id: string): Promise<Response.UserPictureProfileUpdate>;

                delete(session_id: string): Promise<Response.UserPictureProfileDelete>;
            };
        };
    };

    setApiOrigin(origin: string): void;
};

export * as Errors from "./types/errors";
export * as Responses from "./types/responses";
export * as Types from "./types/types";
export = AuthAPI;
