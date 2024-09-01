import { Tokens, User } from "shared/types/auth";

export interface AuthSchema {
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    user: User | null;
}

export interface UserData {
    user: User;
    tokens: Tokens;
}
