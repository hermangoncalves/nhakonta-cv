import authMiddleware from "@/middlewares/auth";
import { jsonSchema, jsonContentRequired } from "@/utils/json-schema";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from '@/utils/http-status-codes';

export const createUser = createRoute({
    tags: ['onboarding'],
    method: 'post',
    path: '/v1/users',
    middleware: [
        authMiddleware,
    ],
    request: {
        body: jsonContentRequired(z.object({
            email: z.string().email(),
            firstName: z.string(),
            lastName: z.string(),
            imageUrl: z.string(),
            provider: z.string(),
            providerId: z.string(),
        }), 'User to create')
    },
    responses: {
        [HttpStatusCode.CREATED]: jsonSchema(z.object({
            id: z.number(),
        }), 'User created'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
        [HttpStatusCode.INTERNAL_SERVER_ERROR]: jsonSchema(z.object({
            error: z.string(),
        }), 'Failed to create user'),
    },
});

export type CreateUserRoute = typeof createUser;