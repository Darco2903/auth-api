# Auth API

## Darco2903 Authentification API

## Description

This API is used to authenticate users on **Darco2903** platforms.

### Installation

```bash
npm install ./auth-api-x.x.x.tgz
```

### Usage

The API supports both Node.js and browser environments.

```javascript
// Node.js
const AuthAPI = require("auth-api");

// or

// Browser
import AuthAPI from "auth-api";
```

That's it! You can now use the API.

### API

| Method                        | Description                       |
| ----------------------------- | --------------------------------- |
| `auth`                        | Check if a user is authenticated. |
| `login`                       | Log in a user.                    |
| `logout`                      | Log out a user.                   |
| `permission.get`              | Get the permission of a user.     |
| `permission.has`              | Check if a user has a permission. |
| `session.get`                 | Get the session of a user.        |
| `session.refresh`             | Refresh a user session.           |
| `user.getFromId`              | Get a user from an ID.            |
| `user.getFromSession`         | Get a user from a session.        |
| `user.updateUsername`         | Update a user's username.         |
| `user.picture.profile.get`    | Get a user's profile picture.     |
| `user.picture.profile.update` | Update a user's profile picture.  |
| `user.picture.profile.delete` | Delete a user's profile picture.  |
