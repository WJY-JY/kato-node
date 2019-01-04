/// <reference types="node" />
import { NextHandleFunction } from "connect";
import { IncomingMessage, ServerResponse } from "http";
export declare function middlewareWrapper(nativeMiddleware: NextHandleFunction): (req: IncomingMessage, res: ServerResponse) => Promise<{}>;
