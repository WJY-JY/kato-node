import { Request, Response } from "express";
import Kato from "../core/kato";
export declare function adapter(kato: Kato): (req: Request, res: Response) => Promise<void>;
