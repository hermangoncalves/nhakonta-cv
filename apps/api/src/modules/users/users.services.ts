import { DB } from "@/db";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";

async function getUserByClerkId(db: DB, clerkId: string) {
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