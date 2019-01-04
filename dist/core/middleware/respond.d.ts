import { Middleware } from "../middleware";
import Context from "../context";
export default function respond(ctx: Context, next: Middleware): Promise<void>;
