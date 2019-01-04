import Context from "../context";
import { Middleware } from "../middleware";
export default function invoke(ctx: Context, next: Middleware): Promise<void>;
