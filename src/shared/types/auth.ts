export interface Tokens {
    access: {
        token: string;
        expires: string;
    };
    refresh: {
        token: string;
        expires: string;
    };
}

export interface User {
    role: string;
    isEmailVerified: boolean;
    name: string;
    email: string;
    id: string;
}
