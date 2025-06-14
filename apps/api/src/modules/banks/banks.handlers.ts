import { AppRouteHandler } from "@/types";
import { CreateBankRoute, DeleteBankRoute, ListBanksRoute } from "./banks.routes";
import * as HttpStatusCode from '@/utils/http-status-codes';
import getDB from "@/db";
import { banks } from "@/db/schemas";
import { count, eq } from "drizzle-orm";
import { usersServices } from "../users/users.services";
import { bankServices } from "./banks.services";

export const createBank: AppRouteHandler<CreateBankRoute> = async (c) => {
    const { clerkId } = c.get('user')
    const body = c.req.valid('json');

    const db = getDB(c);

    const user = await usersServices.getUserByClerkId(c, clerkId)

    if (!user) {
        return c.json({
            error: 'User not found',
        }, HttpStatusCode.UNAUTHORIZED);
    }

    const [newBank] = await bankServices.createBank(c, {
        ...body,
        clerkId,
        userId: user.id
    })

    if (!newBank) {
        console.log('Failed to create bank account');
        return c.json({
            error: 'Failed to create bank account',
        }, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    return c.json({
        id: newBank.id,
    }, HttpStatusCode.CREATED);
}

export const listBanks: AppRouteHandler<ListBanksRoute> = async (c) => {
    const { clerkId } = c.get('user')
    const { page = '1', limit = '10' } = c.req.valid('query');
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const offset = (pageNumber - 1) * limitNumber;

    const db = getDB(c);

    const user = await usersServices.getUserByClerkId(c, clerkId)

    if (!user) {
        return c.json({
            error: 'User not found',
        }, HttpStatusCode.UNAUTHORIZED);
    }

    const results = await bankServices.listBanks(c, user.id, clerkId, limitNumber, offset)

    const [{ count: totalCount }] = await db.select({ count: count() })
        .from(banks)
        .where(eq(banks.clerkId, clerkId));

    return c.json({
        banks: results,
        totalAccounts: totalCount,
        totalShared: totalCount,
    }, HttpStatusCode.OK);
}

export const deleteBank: AppRouteHandler<DeleteBankRoute> = async (c) => {
    const db = getDB(c);
    const { clerkId } = c.get('user')
    const { id } = c.req.valid('param');

    const user = await usersServices.getUserByClerkId(c, clerkId)

    if (!user) {
        return c.json({
            error: 'User not found',
        }, HttpStatusCode.UNAUTHORIZED);
    }

    const existingBank = await bankServices.checkBankExists(db, id, user.id)

    if (!existingBank) {
        return c.json({
            error: 'Bank account not found',
        }, HttpStatusCode.NOT_FOUND);
    }

    await bankServices.deleteBank(db, existingBank.id, user.id)

    return c.body(null, HttpStatusCode.NO_CONTENT);
}


// export const getBank: AppRouteHandler<GetBankRoute> = async (c) => {
//     const { clerkId } = c.get('user')
//     const { id } = c.req.valid('params');

//     const db = getDB(c);
//     const bank = await db.query.banks.findFirst({
//         where: (banks, { and, eq }) => and(
//             eq(banks.id, parseInt(id)),
//             eq(banks.clerkId, clerkId)
//         )
//     });

//     if (!bank) {
//         return c.json({
//             error: 'Bank account not found',
//         }, HttpStatusCode.NOT_FOUND);
//     }

//     return c.json(bank);
// }

// export const updateBank: AppRouteHandler<UpdateBankRoute> = async (c) => {
//     const { clerkId } = c.get('user')
//     const { id } = c.req.valid('params');
//     const body = c.req.valid('json');

//     const db = getDB(c);
//     const [updatedBank] = await db.update(banks)
//         .set({
//             ...body,
//             updatedAt: new Date().toISOString(),
//         })
//         .where((banks, { and, eq }) => and(
//             eq(banks.id, parseInt(id)),
//             eq(banks.clerkId, clerkId)
//         ))
//         .returning();

//     if (!updatedBank) {
//         return c.json({
//             error: 'Bank account not found',
//         }, HttpStatusCode.NOT_FOUND);
//     }

//     return c.json(updatedBank);
// }

// export const deleteBank: AppRouteHandler<DeleteBankRoute> = async (c) => {
//     const { clerkId } = c.get('user')
//     const { id } = c.req.valid('params');

//     const db = getDB(c);
//     const [deletedBank] = await db.delete(banks)
//         .where((banks, { and, eq }) => and(
//             eq(banks.id, parseInt(id)),
//             eq(banks.clerkId, clerkId)
//         ))
//         .returning();

//     if (!deletedBank) {
//         return c.json({
//             error: 'Bank account not found',
//         }, HttpStatusCode.NOT_FOUND);
//     }

//     return c.json(null, HttpStatusCode.NO_CONTENT);
// }
