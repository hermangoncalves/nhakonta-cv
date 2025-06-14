import authMiddleware from "@/middlewares/auth";
import { jsonSchema, jsonContentRequired } from "@/utils/json-schema";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from '@/utils/http-status-codes';
import {
    bankAccountSchema,
    createBankAccountSchema,
    listBankAccountsSchema,
    updateBankAccountSchema,
} from '@/schemas';

export const createBank = createRoute({
    tags: ['banks'],
    method: 'post',
    path: '/api/v1/banks',
    middleware: [
        authMiddleware,
    ],
    request: {
        body: jsonContentRequired(createBankAccountSchema, 'Bank account to create')
    },
    responses: {
        [HttpStatusCode.CREATED]: jsonSchema(z.object({
            id: z.number(),
        }), 'Bank account created'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
        [HttpStatusCode.INTERNAL_SERVER_ERROR]: jsonSchema(z.object({
            error: z.string(),
        }), 'Failed to create bank account'),
    },
});

export const listBanks = createRoute({
    tags: ['banks'],
    method: 'get',
    path: '/api/v1/banks',
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
        [HttpStatusCode.OK]: jsonSchema(listBankAccountsSchema, 'List of bank accounts'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
    },
});

export const getBank = createRoute({
    tags: ['banks'],
    method: 'get',
    path: '/api/v1/banks/{id}',
    middleware: [
        authMiddleware,
    ],
    request: {
        params: z.object({
            id: z.string().describe('Bank account ID'),
        }),
    },
    responses: {
        [HttpStatusCode.OK]: jsonSchema(bankAccountSchema, 'Bank account details'),
        [HttpStatusCode.NOT_FOUND]: jsonSchema(z.object({
            error: z.string(),
        }), 'Bank account not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
    },
});

export const updateBank = createRoute({
    tags: ['banks'],
    method: 'put',
    path: '/api/v1/banks/{id}',
    middleware: [
        authMiddleware,
    ],
    request: {
        params: z.object({
            id: z.string().describe('Bank account ID'),
        }),
        body: jsonContentRequired(updateBankAccountSchema, 'Updated bank account details'),
    },
    responses: {
        [HttpStatusCode.OK]: jsonSchema(bankAccountSchema, 'Updated bank account'),
        [HttpStatusCode.NOT_FOUND]: jsonSchema(z.object({
            error: z.string(),
        }), 'Bank account not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
    },
});

export const deleteBank = createRoute({
    tags: ['banks'],
    method: 'delete',
    path: '/api/v1/banks/{id}',
    middleware: [
        authMiddleware,
    ],
    request: {
        params: z.object({
            id: z.coerce.number().describe('Bank account ID'),
        }),
    },
    responses: {
        [HttpStatusCode.NO_CONTENT]: {
            description: "Bank deleted",
        },
        [HttpStatusCode.NOT_FOUND]: jsonSchema(z.object({
            error: z.string(),
        }), 'Bank account not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string(),
        }), 'User not found'),
    },
});

export type CreateBankRoute = typeof createBank;
export type ListBanksRoute = typeof listBanks;
export type GetBankRoute = typeof getBank;
export type UpdateBankRoute = typeof updateBank;
export type DeleteBankRoute = typeof deleteBank;