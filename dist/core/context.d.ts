/// <reference types="node" />
import { ModuleDescriptor, MethodDescriptor } from "./module";
import Kato from "./kato";
import { KatoRequest } from "./http/request";
import { KatoResponse } from "./http/response";
import { IncomingMessage, ServerResponse } from "http";
export default class Context {
    static readonly current: Context;
    kato: Kato;
    req: KatoRequest;
    res: KatoResponse;
    module: ModuleDescriptor;
    method: MethodDescriptor;
    parameters: any;
    result: any;
    bypassing: boolean;
    /**
     * 初始化一个kato上下文
     * @param req 原生的http请求
     * @param res 原生的http响应
     */
    constructor(req: IncomingMessage, res: ServerResponse);
}
