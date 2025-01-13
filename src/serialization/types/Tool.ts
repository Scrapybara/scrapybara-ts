import { z } from "zod";

export type Tool<T = any, R = any> = {
    name: string;
    description?: string;
    parameters: z.ZodSchema<T>;
    execute: (parameters: T) => Promise<R>;
};
