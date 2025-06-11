import createApp from '@/app'

const app = createApp()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
