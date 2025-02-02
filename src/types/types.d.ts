type Role = {
    description: string;
    // id: number;
    level: number;
    name: string;
};

export type UserPublic = {
    public_id: string;
    name: string;
    profile_picture: string;
    round_border: boolean;
};

export type User = UserPublic & {
    // id: number;
    role: Role;
    email: string;
    // password_hash: string;
    verified: boolean;
    last_login: string;
    created_at: string;
    updated_at: string;
    email_verif: string;
    password_reset: string;
};

export type Session = {
    created_at: string;
    expires_at: string;
    updated_at: string;
};
