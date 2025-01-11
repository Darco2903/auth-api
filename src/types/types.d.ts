export type User = {
    public_id: string;
    name: string;
    email: string;
    round_border: boolean;
};

export type Session = {
    user_id: string;
    expires_at: string;
    created_at: string;
    updated_at: string;
};
