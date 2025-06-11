import { z } from "@hono/zod-openapi";

export const jsonSchema = <T extends z.ZodSchema>(schema: T, description: string) => {
    return {
        description,
        content: {
            'application/json': {
                schema,
            },
        },
    }
}

export const jsonContentRequired = <T extends z.ZodSchema>(schema: T, description: string) => {
    return {
        ...jsonSchema(schema, description),
        required: true,
    }
}
