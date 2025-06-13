import type { Config } from 'drizzle-kit';

export default {
    schema: './src/db/schemas/index.ts',
    out: './src/db/migrations',
    dialect: 'sqlite',
} satisfies Config;