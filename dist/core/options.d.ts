declare type KatoCorsMethodOptions = ("GET" | "HEAD" | "PUT" | "PATCH" | "POST" | "DELETE")[];
export declare type KatoCorsOptions = {
    origin?: string;
    methods?: KatoCorsMethodOptions;
    headers?: string[];
    optionsStatusCode?: number;
};
export declare type KatoOptions = {
    dev?: boolean;
    outputRuntimeError?: boolean;
    loose?: boolean;
    files?: {
        storage?: any;
        maxSize?: number;
        maxCount?: number;
    };
    cors?: boolean | KatoCorsOptions;
};
export declare function getOptions(options: KatoOptions): KatoOptions;
export {};
