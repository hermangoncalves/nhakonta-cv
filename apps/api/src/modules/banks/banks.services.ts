import getDB, { DB } from "@/db";
import { BankInsertModel, banks } from "@/db/schemas";
import { AppBindings } from "@/types";
import { Context } from "hono";
import { and, desc, eq } from "drizzle-orm";

async function createBank(c: Context<AppBindings>, values: BankInsertModel) {
    const db = getDB(c)

    return await db.insert(banks).values(values).returning({
        id: banks.id
    });
}

async function listBanks(c: Context<AppBindings>, userId: number, clerkId: string, limit: number = 10, offset: number = 0) {
    const db = getDB(c)

    return await db.query.banks.findMany({
        where: and(
            eq(banks.userId, userId),
            eq(banks.clerkId, clerkId)
        ),
        limit,
        offset,
        orderBy: desc(banks.createdAt)
    });
}

async function updateBank(db: DB, id: number, userId: number, values: Partial<BankInsertModel>) {
    return await db.update(banks)
        .set(values)
        .where(and(
            eq(banks.id, id),
            eq(banks.userId, userId)
        ))
        .returning();
}

async function deleteBank(db: DB, id: number, userId: number) {
    return await db.delete(banks)
        .where(and(
            eq(banks.id, id),
            eq(banks.userId, userId)
        ))
        .returning();
}

async function checkBankExists(db: DB, id: number, userId: number) {
    return await db.query.banks.findFirst({
        where: and(
            eq(banks.id, id),
            eq(banks.userId, userId)
        ),
        columns: {
            id: true
        }
    })
}


export const bankServices = {
    createBank,
    listBanks,
    updateBank,
    deleteBank,
    checkBankExists
}