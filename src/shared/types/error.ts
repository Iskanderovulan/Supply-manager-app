export interface CustomError {
    status: number;
    data: {
        code: number;
        message: string;
        stack?: string;
    };
}
