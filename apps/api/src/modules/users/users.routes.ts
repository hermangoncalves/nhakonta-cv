import authMiddleware from "@/middlewares/auth";
import { jsonSchema, jsonContentRequired } from "@/utils/json-schema";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from '@/utils/http-status-codes';
import {
    userSchema,
    createUserSchema,
    listUsersSchema,
    updateUserSchema,
    listUsersAvatarsSchema,
} from '@/schemas';

export const createUser = createRoute({
    tags: ['users'],
    method: 'post',
    path: '/api/v1/users',
    middleware: [
        authMiddleware,
    ],
    request: {
        body: jsonContentRequired(createUserSchema, 'User to create')
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

export const listUsers = createRoute({
    tags: ['users'],
    method: 'get',
    path: '/v1/users',
    middleware: [
        authMiddleware,
    ],
    request: {
        query: z.object({
            page: z.string().optional().describe('Page number'),
            limit: z.string().optional().describe('Number of items per page'),
        }),
    },
    responses: {
        [HttpStatusCode.OK]: jsonSchema(listUsersSchema, 'List of users'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
    },
});

export const listLatestUsersAvatars = createRoute({
    tags: ['users'],
    method: 'get',
    path: '/api/v1/users/latest',
    responses: {
        [HttpStatusCode.OK]: jsonSchema(listUsersAvatarsSchema, 'List of users avatars'),
    },
});

export type LastesUsersAvatarRoute = typeof listLatestUsersAvatars

export const getUser = createRoute({
    tags: ['users'],
    method: 'get',
    path: '/v1/users/{id}',
    middleware: [
        authMiddleware,
    ],
    request: {
        params: z.object({
            id: z.string().describe('User ID'),
        }),
    },
    responses: {
        [HttpStatusCode.OK]: jsonSchema(userSchema, 'User details'),
        [HttpStatusCode.NOT_FOUND]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
    },
});

export const updateUser = createRoute({
    tags: ['users'],
    method: 'put',
    path: '/v1/users/{id}',
    middleware: [
        authMiddleware,
    ],
    request: {
        params: z.object({
            id: z.string().describe('User ID'),
        }),
        body: jsonContentRequired(updateUserSchema, 'Updated user details'),
    },
    responses: {
        [HttpStatusCode.OK]: jsonSchema(userSchema, 'Updated user'),
        [HttpStatusCode.NOT_FOUND]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
    },
});

export const deleteUser = createRoute({
    tags: ['users'],
    method: 'delete',
    path: '/v1/users/{id}',
    middleware: [
        authMiddleware,
    ],
    request: {
        params: z.object({
            id: z.string().describe('User ID'),
        }),
    },
    responses: {
        [HttpStatusCode.NO_CONTENT]: jsonSchema(z.null(), 'User deleted'),
        [HttpStatusCode.NOT_FOUND]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
    },
});

export type CreateUserRoute = typeof createUser;
export type ListUsersRoute = typeof listUsers;
export type GetUserRoute = typeof getUser;
export type UpdateUserRoute = typeof updateUser;
export type DeleteUserRoute = typeof deleteUser;