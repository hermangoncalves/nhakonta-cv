import * as routes from '@/modules/banks/banks.routes';
import * as handlers from '@/modules/banks/banks.handlers';
import { createRouter } from '@/app';

const banksRoutes = createRouter()
    .openapi(routes.createBank, handlers.createBank)
    .openapi(routes.listBanks, handlers.listBanks)
    // .openapi(routes.getBank, handlers.getBank)
    // .openapi(routes.updateBank, handlers.updateBank)
    .openapi(routes.deleteBank, handlers.deleteBank);

export default banksRoutes;
