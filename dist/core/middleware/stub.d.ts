import Context from "../context";
import { Middleware } from "../middleware";
export declare function cleanStubCache(): void;
export default function stub(ctx: Context, next: Middleware): Promise<void>;
