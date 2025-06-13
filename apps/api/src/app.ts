import { OpenAPIHono } from '@hono/zod-openapi'
import { pinoLogger } from 'hono-pino'
import { cors } from 'hono/cors';
import { pinoLoggerOptions } from '@/utils/logger'
import pkgJson from '../package.json';
import { Scalar } from '@scalar/hono-api-reference'
import defaultHook from '@/hooks/default-hook';
import onError from '@/middlewares/on-error';
import notFound from '@/middlewares/not-found';

export function createRouter() {
    const router = new OpenAPIHono({
        strict: false,
        defaultHook,
    })

    return router
}

export default function createApp() {
    const app = createRouter()

    app.use(pinoLogger({
        pino: pinoLoggerOptions,
        http: {
            reqId: () => crypto.randomUUID(),
        },
    }))

    app.use('*', async (ctx, next) => {
        const allowedOrigins = ctx.env.ALLOWED_ORIGINS

        const corsMiddleware = cors(
            {
                origin: allowedOrigins,
                allowHeaders: ['Content-Type', 'Authorization'],
                allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                credentials: true,
            }
        )

        return corsMiddleware(ctx, next)
    })

    app.doc('/docs', {
        openapi: '3.0.0',
        info: {
            title: pkgJson.name,
            version: pkgJson.version,
        },
    });

    app.get('/documentation', Scalar({
        url: '/docs',
        theme: 'kepler',
        layout: 'modern'
    }))

    app.onError(onError);
    app.notFound(notFound);

    return app
}