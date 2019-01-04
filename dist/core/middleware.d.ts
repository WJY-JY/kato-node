import Context from "./context";
export declare type Middleware = (ctx?: Context, next?: Middleware) => Promise<void>;
export declare class MiddlewareContainer {
    private readonly middlewares;
    private readonly firstMiddleware;
    constructor();
    do(ctx: Context): Promise<void>;
    use(middleware: Middleware, locateMiddleware?: Middleware): void;
    useAfter(middleware: Middleware, locateMiddleware: Middleware): void;
}
