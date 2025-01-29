import * as Response from "./types/responses";
import { ROLES } from "./types/roles";

const AuthAPI: {
    ROLES: ROLES;

    auth(): Promise<Response.Auth>;

    login(identifier: string, password: string, token: string): Promise<Response.LoginWeb>;

    logout(): Promise<Response.Logout>;

    register(username: string, email: string, password: string, token: string): Promise<Response.Register>;

    passwordRequest(email: string, token: string): Promise<Response.PasswordRequest>;

    verify(token: string): Promise<Response.Verify>;
    // verify(verifyToken: string, token: string): Promise<Response.Verify>;

    verifyRequest(email: string, token: string): Promise<Response.VerifyRequest>;

    permission: {
        get(): Promise<Response.Permission>;

        has(level: number): Promise<Response.HasPermission>;
    };

    session: {
        get(): Promise<Response.Session>;

        refresh(): Promise<Response.Refresh>;
    };

    user: {
        getFromId(client_id: string): Promise<Response.UserFromId>;

        me(): Promise<Response.User>;

        updateEmail(email: string, token: string): Promise<Response.UserUpdateEmail>;

        updatePassword(password: string, token: string): Promise<Response.UserUpdatePassword>;

        updateUsername(username: string, token: string): Promise<Response.UserUpdateUsername>;

        picture: {
            profile: {
                border(roundBorder: boolean): Promise<Response.UserPictureUpdateBorder>;

                get(client_id: string): Promise<Response.UserPictureProfileGet>;

                update(image: Blob): Promise<Response.UserPictureProfileUpdate>;

                delete(): Promise<Response.UserPictureProfileDelete>;
            };
        };
    };
};

export * as Errors from "./types/errors";
export * as Responses from "./types/responses";
export * as Types from "./types/types";
export default AuthAPI;
