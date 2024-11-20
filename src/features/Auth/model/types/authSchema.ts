import { Tokens, User } from "@shared/types/auth";

export type RememberMeSchema = { rememberMe: boolean };

export interface AuthSchema extends RememberMeSchema {
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
}

export interface UserData {
    user: User;
    tokens: Tokens;
}
