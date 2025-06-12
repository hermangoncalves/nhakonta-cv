import authMiddleware from "@/middlewares/auth";
import { jsonSchema, jsonContentRequired } from "@/utils/json-schema";
import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from '@/utils/http-status-codes';
import { bankAccountSchema, createBankAccountSchema, updateBankAccountSchema, listBankAccountsSchema } from "./banks.schemas";

export const createBank = createRoute({
    tags: ['bank'],
    method: 'post',
    path: '/api/banks',
    middleware: [
        authMiddleware,
    ],
    request: {
        body: jsonContentRequired(createBankAccountSchema, 'Bank account to create')
    },
    responses: {
        [HttpStatusCode.CREATED]: jsonSchema(z.object({
            id: z.number().describe('Bank account ID'),
        }), 'Bank account created'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string().describe('User not found'),
        }), 'User not found'),
        [HttpStatusCode.INTERNAL_SERVER_ERROR]: jsonSchema(z.object({
            error: z.string().describe('Failed to create bank account'),
        }), 'Failed to create bank account'),
    },
});

export const listBanks = createRoute({
    tags: ['bank'],
    method: 'get',
    path: '/api/banks',
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
            error: z.string().describe('User not found'),
        }), 'User not found'),
    },
});

export const getBank = createRoute({
    tags: ['bank'],
    method: 'get',
    path: '/api/banks/{id}',
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
            error: z.string().describe('Bank account not found'),
        }), 'Bank account not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string().describe('User not found'),
        }), 'User not found'),
    },
});

export const updateBank = createRoute({
    tags: ['bank'],
    method: 'put',
    path: '/api/banks/{id}',
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
        [HttpStatusCode.OK]: jsonSchema(createBankAccountSchema, 'Updated bank account'),
        [HttpStatusCode.NOT_FOUND]: jsonSchema(z.object({
            error: z.string().describe('Bank account not found'),
        }), 'Bank account not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string().describe('User not found'),
        }), 'User not found'),
    },
});

export const deleteBank = createRoute({
    tags: ['bank'],
    method: 'delete',
    path: '/api/banks/{id}',
    middleware: [
        authMiddleware,
    ],
    request: {
        params: z.object({
            id: z.string().describe('Bank account ID'),
        }),
    },
    responses: {
        [HttpStatusCode.NO_CONTENT]: jsonSchema(z.null(), 'Bank account deleted'),
        [HttpStatusCode.NOT_FOUND]: jsonSchema(z.object({
            error: z.string().describe('Bank account not found'),
        }), 'Bank account not found'),
        [HttpStatusCode.UNAUTHORIZED]: jsonSchema(z.object({
            error: z.string().describe('User not found'),
        }), 'User not found'),
    },
});

export type CreateBankRoute = typeof createBank;
export type ListBanksRoute = typeof listBanks;
export type GetBankRoute = typeof getBank;
export type UpdateBankRoute = typeof updateBank;
export type DeleteBankRoute = typeof deleteBank;