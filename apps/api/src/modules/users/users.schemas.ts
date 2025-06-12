import { z } from '@hono/zod-openapi'


export const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    imageUrl: z.string(),
    provider: z.string(),
    providerId: z.string(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export const updateUserSchema = userSchema.partial();

export const listUsersSchema = z.object({
    items: z.array(userSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
});
