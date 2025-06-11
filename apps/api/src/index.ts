import createApp from '@/app'
import usersRoutes from '@/modules/users'

const app = createApp()

const routes = [
	usersRoutes,
];

routes.forEach((route) => {
    app.route('/', route);
});


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
