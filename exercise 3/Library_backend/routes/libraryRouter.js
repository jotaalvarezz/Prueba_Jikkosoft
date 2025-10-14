import { Router } from 'express';
import { LibraryController } from '../controllers/libraryController.js';
import { LibraryService } from '../services/libraryService.js';
import { LibraryRepository } from '../repositories/libraryRepository.js';

export const createLibraryRoutes = ({ Library }) => {
  const router = Router();
  
  const libraryRepository = new LibraryRepository({ Library });
  const libraryService = new LibraryService({ libraryRepository });
  const libraryController = new LibraryController({ libraryService });

  router.get('/libraries', libraryController.getAll);
  router.get('/libraries/:id', libraryController.findById);
  router.post('/libraries', libraryController.create);
  router.put('/libraries/:id', libraryController.update);
  router.delete('/libraries/:id', libraryController.delete);
  router.get('/libraries/:id/books', libraryController.getBooks);

  return router;
};

export default createLibraryRoutes;