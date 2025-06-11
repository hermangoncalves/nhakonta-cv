import { AppRouteHandler } from "@/types";
import { CreateUserRoute } from "./users.routes";
import * as HttpStatusCode from '@/utils/http-status-codes';
import getDB from "@/db";
import { users } from "@/db/schemas";
import { createClerkClient } from "@clerk/clerk-sdk-node";

export const createUser: AppRouteHandler<CreateUserRoute> = async (c) => {
    const { clerkId } = c.get('user')
    const body = c.req.valid('json');

    const db = getDB(c);
    const [newUser] = await db.insert(users).values({
        ...body,
        clerkId,
    }).returning();


    if (!newUser) {
        console.log('Failed to create user');
        return c.json({
            error: 'Failed to create user',
        }, HttpStatusCode.INTERNAL_SERVER_ERROR);
    }

    const clerkClient = createClerkClient({
        secretKey: c.env.CLERK_SECRET_KEY,
    });

    await clerkClient.users.updateUserMetadata(clerkId, {
        publicMetadata: {
            userCreated: true,
        }
    })

    return c.json({
        id: newUser.id,
    }, HttpStatusCode.CREATED);
}