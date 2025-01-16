export type UserPublic = {
    public_id: string;
    name: string;
    round_border: boolean;
};

export type User = UserPublic & {
    email: string;
};

export type Session = {
    user_id: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
};
