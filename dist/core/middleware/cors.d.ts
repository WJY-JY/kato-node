import Context from "../context";
import { Middleware } from "../middleware";
export default function cors(ctx: Context, next: Middleware): Promise<void>;
