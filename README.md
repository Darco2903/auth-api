# Authentication API

## Description

This package provides an authentication API for Darco2903's services, including JWT token signing and verification. It includes both client and server utilities to facilitate the implementation of authentication across multiple services.

## Installation

```bash
npm install @darco2903/auth-api
```

## Usage

### Creating a client

```ts
import { createClient } from "@darco2903/auth-api/client";

const SERVER_ORIGIN = "https://auth.example.com";
const authApi = createAuthClient(SERVER_ORIGIN);
```

### Signing a JWT token

```ts
import {
    JWTSign,
    type AccessTokenData,
    UserRole,
} from "@darco2903/auth-api/server";
import { Hour } from "@darco2903/secondthought";

const JWT_PRIVATE_KEY = "";
const tokenData: AccessTokenData = {
    public_id: "user_public_id",
    role: UserRole.User,
    totp_required: false,
    totp_verified: false,
};
const expiresIn = new Hour(1); // Token expires in 1 hour. Also accepts a number of seconds (e.g., 3600).

await JWTSign(tokenData, JWT_PRIVATE_KEY, expiresIn).match(
    (signedToken) => {
        console.log("JWT signing successful:", signedToken);
    },
    (err) => {
        console.error(`JWT signing failed: ${err.message}`);
    }
);
```

### Verifying a JWT token

```ts
import { JWTVerify } from "@darco2903/auth-api/server";

const accessToken = "..."; // Your JWT token here

await JWTVerify(accessToken, JWT_PUBLIC_KEY).match(
    (decodedToken) => {
        console.log("JWT verification successful:", decodedToken);
    },
    (err) => {
        console.error(`JWT verification failed: ${err.message}`);
    }
);
```
