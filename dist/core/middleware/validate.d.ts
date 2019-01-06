import Context from "../context";
import { Middleware } from "../middleware";
import * as joi from 'joi';
import { SchemaLike } from "joi";
export default function paramValidate(ctx: Context, next: Middleware): Promise<void>;
export declare function validate(...schemas: SchemaLike[]): (target: any, key: any) => void;
export declare const should: typeof joi;
