type BaseResponse = {
    result: boolean;
    error?: string;
};

const AuthAPI: {
    setSessionId(session_id: string): void;

    auth(session_id: string): Promise<BaseResponse>;
    login(
        identifier: string,
        password: string
    ): Promise<
        BaseResponse & {
            session_id?: string;
        }
    >;
    permission(session_id: string): Promise<BaseResponse & { level: number }>;
    hasPermission(session_id: string, level: number): Promise<BaseResponse>;
    refresh(session_id: string): Promise<BaseResponse>;
    session(session_id: string): Promise<
        BaseResponse & {
            session: {
                user_id: string;
                expires_at: string;
                created_at: string;
                updated_at: string;
            };
        }
    >;

    user: {
        id(client_id: string): Promise<
            BaseResponse & {
                user?: {
                    public_id: string;
                    name: string;
                    email: string;
                    round_border: boolean;
                };
            }
        >;
        session(session_id: string): Promise<
            BaseResponse & {
                user?: {
                    public_id: string;
                    name: string;
                    email: string;
                    round_border: boolean;
                };
            }
        >;
        username(username: string): Promise<
            BaseResponse & {
                error?: "USERNAME_REQUIRED" | "USERNAME_TOO_SHORT" | "USERNAME_TOO_LONG" | "SESSION_ID_REQUIRED" | "UNAUTHORIZED" | "USERNAME_EXISTS";
            }
        >;

        picture: {
            profile: {
                get(client_id: string): Promise<Blob>;
                update(image: Blob, roundBorder?: boolean): Promise<BaseResponse>;
                delete(roundBorder?: boolean): Promise<BaseResponse>;
            };
        };
    };
};

export = AuthAPI;
