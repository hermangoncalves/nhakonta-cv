import { OpenAPIHono } from '@hono/zod-openapi'
import { pinoLogger } from 'hono-pino'
import { pinoLoggerOptions } from './utils/logger'

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

    return app
}