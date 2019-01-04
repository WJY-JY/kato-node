/// <reference types="node" />
import { IncomingMessage } from "http";
export interface KatoRequest extends IncomingMessage {
}
export declare function createRequest(req: IncomingMessage): IncomingMessage;
