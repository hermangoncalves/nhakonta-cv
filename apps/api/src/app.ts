import { OpenAPIHono } from '@hono/zod-openapi'
import { pinoLogger } from 'hono-pino'
import { pinoLoggerOptions } from '@/utils/logger'
import pkgJson from '../package.json';
import { Scalar } from '@scalar/hono-api-reference'

export function createRouter() {
    const router = new OpenAPIHono({
        strict: false
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

    return app
}