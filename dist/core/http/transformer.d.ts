import { KatoResponse } from "./response";
/**
 * 把KatoResponse转换成为node标准的res,并写入http流中
 * @param res
 */
export declare function transformer(res: KatoResponse): void | KatoResponse;
