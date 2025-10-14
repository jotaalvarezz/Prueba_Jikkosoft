import { Router } from 'express';
import { BookController } from '../controllers/bookController.js';
import { BookService } from '../services/bookService.js';
import { BookRepository } from '../repositories/bookRepository.js';

export const createBookRoutes = ({ Book }) => {
  const router = Router();
  
  const bookRepository = new BookRepository({ Book });
  const bookService = new BookService({ bookRepository });
  const bookController = new BookController({ bookService });

  router.get('/books', bookController.getAll);
  router.get('/books/:id', bookController.findById);
  router.post('/books', bookController.create);
  router.put('/books/:id', bookController.update);
  router.delete('/books/:id', bookController.delete);
  router.get('/books/:id/loans', bookController.getLoans);
  router.get('/books/:id/genres', bookController.getGenres);

  return router;
};

export default createBookRoutes;