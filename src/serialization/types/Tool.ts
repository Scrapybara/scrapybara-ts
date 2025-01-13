import { z } from "zod";

export type Tool<T = any, R = any> = {
    name: string;
    description?: string;
    parameters: z.ZodSchema<T>;
    execute?: (parameters: T) => Promise<R>;
};

export function tool<T = any, R = any>({ name, description, parameters, execute }: Tool<T, R>): Tool<T, R> {
    return {
        name,
        description,
        parameters,
        execute,
    };
}
