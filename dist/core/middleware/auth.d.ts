import Context from "../context";
import { Middleware } from "../middleware";
export default function authenticate(ctx: Context, next: Middleware): Promise<void>;
export declare type AuthFunction = (ctx: Context) => Promise<boolean> | boolean;
export declare function auth(...authFuncs: AuthFunction[]): (target: any, key: any) => void;
export declare function not(authFunc: AuthFunction): AuthFunction;
export declare function or(...authFuncs: AuthFunction[]): AuthFunction;
export declare function and(...authFuncs: AuthFunction[]): AuthFunction;
