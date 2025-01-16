export type UserPublic = {
    name: string;
    public_id: string;
    round_border: boolean;
};

type Role = {
    description: string;
    // id: number;
    level: number;
    name: string;
};

export type User = UserPublic & {
    created_at: string;
    email: string;
    // id: number;
    last_login: string;
    profile_picture: string;
    role: Role;
    updated_at: string;
};

export type Session = {
    created_at: string;
    expires_at: string;
    updated_at: string;
};
