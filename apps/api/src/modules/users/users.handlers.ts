import { AppRouteHandler } from "@/types";
import { CreateUserRoute, LastesUsersAvatarRoute } from "./users.routes";
import * as HttpStatusCode from '@/utils/http-status-codes';
import getDB from "@/db";
import { users } from "@/db/schemas";
import { createClerkClient } from "@clerk/clerk-sdk-node";
import { count, desc } from "drizzle-orm";

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

export const listLatestUsersAvatars: AppRouteHandler<LastesUsersAvatarRoute> = async (c) => {
    const db = getDB(c)

    const latestUsers = await db.query.users.findMany({
        columns: {
            firstName: true,
            imageUrl: true,
        },
        limit: 10,
        offset: 0,
        orderBy: desc(users.createdAt)
    })

    const [{ count: usersCount }] = await db.select({ count: count() }).from(users)

    return c.json({
        users: latestUsers,
        count: usersCount
    })
}

// export const getUser: AppRouteHandler<GetUserRoute> = async (c) => {
//     const { clerkId } = c.get('user');
//     const db = getDB(c);

//     const user = await db.query.users.findFirst({
//         where: (users, { eq }) => eq(users.clerkId, clerkId)
//     });

//     if (!user) {
//         return c.json({
//             error: 'User not found'
//         }, HttpStatusCode.NOT_FOUND);
//     }

//     return c.json(user);
// };

// export const updateUser: AppRouteHandler = async (c) => {
//     const { clerkId } = c.get('user');
//     const body = c.req.valid('json');
//     const db = getDB(c);

//     const [updatedUser] = await db.update(users)
//         .set(body)
//         .where(eq(users.clerkId, clerkId))
//         .returning();

//     if (!updatedUser) {
//         return c.json({
//             error: 'User not found'
//         }, HttpStatusCode.NOT_FOUND);
//     }

//     return c.json(updatedUser);
// };

// export const deleteUser: AppRouteHandler = async (c) => {
//     const { clerkId } = c.get('user');
//     const db = getDB(c);

//     const [deletedUser] = await db.delete(users)
//         .where(eq(users.clerkId, clerkId))
//         .returning();

//     if (!deletedUser) {
//         return c.json({
//             error: 'User not found'
//         }, HttpStatusCode.NOT_FOUND);
//     }

//     const clerkClient = createClerkClient({
//         secretKey: c.env.CLERK_SECRET_KEY,
//     });

//     await clerkClient.users.deleteUser(clerkId);

//     return c.json({
//         message: 'User deleted successfully'
//     });
// };
