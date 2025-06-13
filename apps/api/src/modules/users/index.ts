
import * as routes from '@/modules/users/users.routes';
import * as handlers from '@/modules/users/users.handlers';
import { createRouter } from '@/app';

const usersRoutes = createRouter()
    .openapi(routes.createUser, handlers.createUser)
    .openapi(routes.listLatestUsersAvatars, handlers.listLatestUsersAvatars)

export default usersRoutes;