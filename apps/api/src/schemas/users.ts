import { z } from "@hono/zod-openapi";

export const userSchema = z.object({
    id: z.number(),
    email: z.string().email({
        message: "Invalid email format"
    }).min(3, {
        message: "Email must be at least 3 characters long"
    }).max(255, {
        message: "Email cannot exceed 255 characters"
    }),
    firstName: z.string().min(2, {
        message: "First name must be at least 2 characters long"
    }).max(50, {
        message: "First name cannot exceed 50 characters"
    }),
    lastName: z.string().min(2, {
        message: "Last name must be at least 2 characters long"
    }).max(50, {
        message: "Last name cannot exceed 50 characters"
    }),
    imageUrl: z.string().url({
        message: "Invalid URL format"
    }).max(255, {
        message: "Image URL cannot exceed 255 characters"
    }),
    provider: z.string().min(2, {
        message: "Provider must be at least 2 characters long"
    }).max(50, {
        message: "Provider cannot exceed 50 characters"
    }),
    providerId: z.string().min(2, {
        message: "Provider ID must be at least 2 characters long"
    }).max(255, {
        message: "Provider ID cannot exceed 255 characters"
    }),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const createUserSchema = userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
});

export const updateUserSchema = userSchema.partial();

export const listUsersSchema = z.object({
    items: z.array(userSchema),
    total: z.number().int().nonnegative({
        message: "Total must be a non-negative integer"
    }),
    page: z.number().int().positive({
        message: "Page must be a positive integer"
    }),
    limit: z.number().int().positive({
        message: "Limit must be a positive integer"
    }).max(100, {
        message: "Limit cannot exceed 100"
    }),
});

export const listUsersAvatarsSchema = z.object({
    users: z.array(z.object({
        imageUrl: z.string().nullable(),
        firstName: z.string()
    })),
    count: z.number()
})


export type User = z.infer<typeof userSchema>
export type CreateUser = z.infer<typeof createUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
export type ListUsers = z.infer<typeof listUsersSchema>
export type ListUsersAvatars = z.infer<typeof listUsersAvatarsSchema>
