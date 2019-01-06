/// <reference types="node" />
import { ServerResponse } from "http";
import { Stream } from "stream";
export interface KatoResponse extends ServerResponse {
    body: String | Buffer | Stream;
    writable: boolean;
}
export declare function createResponse(res: ServerResponse): KatoResponse;
