import getDB from "@/db";
import { users } from "@/db/schemas";
import { AppBindings } from "@/types";
import { eq } from "drizzle-orm";
import { Context } from "hono";

async function getUserByClerkId(c: Context<AppBindings>, clerkId: string) {
    const db = getDB(c)

    return await db.query.users.findFirst({
        where: eq(users.clerkId, clerkId),
        columns: {
            id: true,
        }
    })
}

export const usersServices = {
    getUserByClerkId,
}