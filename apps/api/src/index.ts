import createApp from '@/app'
import usersRoutes from '@/modules/users'
import banksRoutes from '@/modules/banks'

const app = createApp()

const routes = [
	usersRoutes,
  banksRoutes
];

routes.forEach((route) => {
    app.route('/', route);
});


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
