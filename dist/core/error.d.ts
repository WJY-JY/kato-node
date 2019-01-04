export declare class KatoError extends Error {
    code: number;
    constructor(message: string, code: number);
}
export declare class KatoCommonError extends KatoError {
    constructor(message: string);
}
export declare class KatoLogicError extends KatoError {
    constructor(message: string, code: number);
}
export declare class KatoRuntimeError extends KatoError {
    constructor(message?: string);
}
