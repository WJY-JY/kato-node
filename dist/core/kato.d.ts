/// <reference types="node" />
import * as http from "http";
import { MiddlewareContainer } from "./middleware";
import { ModuleContainer } from "./module";
import { KatoOptions } from "./options";
import { IncomingMessage, ServerResponse } from "http";
export declare const katoCLS: any;
export default class Kato {
    middlewares: MiddlewareContainer;
    modules: ModuleContainer;
    options: KatoOptions;
    server?: http.Server;
    constructor(options?: KatoOptions);
    use: any;
    useAfter: any;
    load: any;
    do(req: IncomingMessage, res: ServerResponse): Promise<any>;
    listen(port: number, hostname?: string): Promise<{}>;
    close(): Promise<{}>;
}
