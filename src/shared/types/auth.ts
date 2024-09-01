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

export interface authError {
    status: number;
    data: {
        code: number;
        message: string;
        stack?: string;
    };
}
