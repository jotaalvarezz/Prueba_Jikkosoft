import { Router } from 'express';
import { createLibraryRoutes } from './libraryRouter.js';
import { createBookRoutes } from './bookRouter.js';
import { createGenreRoutes } from './genreRouter.js';
import { createMemberRoutes } from './memberRouter.js';
import { createLoanRoutes } from './loanRouter.js';

export const routerApi = (app, models) => {
  const router = Router();
  app.use('/api/v1', router);

  // Inyectamos los modelos en cada router
  router.use(createLibraryRoutes({ Library: models.Library }));
  router.use(createBookRoutes({ Book: models.Book }));
  router.use(createGenreRoutes({ Genre: models.Genre }));
  router.use(createMemberRoutes({ Member: models.Member }));
  router.use(createLoanRoutes({ Loan: models.Loan }));
};

export default routerApi;