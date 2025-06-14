import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { PinoLogger } from "hono-pino";

export interface Env {
    DB: D1Database;
    NODE_ENV: string;
    ALLOWED_ORIGINS: string;
    CLERK_WEBHOOK_SECRET: string;
    CLERK_SECRET_KEY: string;
    ENCRYPTION_KEY: string;
    DISCORD_WEBHOOK: string;
}

export interface AppBindings {
    Bindings: Env,
    Variables: {
        logger: PinoLogger;
        user: {
            clerkId: string;
        };
    }
}

export type AppOpenAPIHono = OpenAPIHono<AppBindings>

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings> 
