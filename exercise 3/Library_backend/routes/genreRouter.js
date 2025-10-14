import { Router } from 'express';
import { GenreController } from '../controllers/genreController.js';
import { GenreService } from '../services/genreService.js';
import { GenreRepository } from '../repositories/genreRepository.js';

export const createGenreRoutes = ({ Genre }) => {
  const router = Router();
  
  const genreRepository = new GenreRepository({ Genre });
  const genreService = new GenreService({ genreRepository });
  const genreController = new GenreController({ genreService });

  router.get('/genres', genreController.getAll);
  router.get('/genres/:id', genreController.findById);
  router.post('/genres', genreController.create);
  router.put('/genres/:id', genreController.update);
  router.delete('/genres/:id', genreController.delete);
  router.get('/genres/:id/books', genreController.getBooks);

  return router;
};

export default createGenreRoutes;
