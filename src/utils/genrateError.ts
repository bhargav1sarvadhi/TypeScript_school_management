class AppError extends Error {
    public errorName: string;
    public message: string;
    constructor(message: string, errorName: string) {
        super(message);
        this.errorName = errorName;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
