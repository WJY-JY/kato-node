import Context from "../context";
import { Middleware } from "../middleware";
export default function parse(ctx: Context, next: Middleware): Promise<void>;
