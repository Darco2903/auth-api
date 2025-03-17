export type ROLES = {
    BANNED: -1;
    NEWBIE: 10;
    USER: 50;
    MODERATOR: 100;
    ADMIN: 150;
    SUPER_ADMIN: 200;
    DEVELOPER: 250;
};

export type LEVELS = {
    "-1": "BANNED";
    10: "NEWBIE";
    50: "USER";
    100: "MODERATOR";
    150: "ADMIN";
    200: "SUPER_ADMIN";
    250: "DEVELOPER";
};
