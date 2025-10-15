import { validateBook, validateBookUpdate } from "../schemas/bookSchema.js";

export class BookController {
  constructor({ bookService }) {
    this.bookService = bookService;
  }

  getAll = async (req, res) => {
    try {
      const { name } = req.query;
      const books = await this.bookService.getAllBooks({ name });
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const book = await this.bookService.getBookById(req.params.id);
      res.json(book);
    } catch (error) {
      if (error.message === "Libro no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const validation = validateBook(req.body);

      if (!validation.success) {
        return res.status(400).json({
          message: validation.error.errors[0].message,
        });
      }

      const book = await this.bookService.createBook(validation.data);

      if (req.body.genres) {
        await this.bookService.setBookGenres(book, req.body.genres);
      }

      const updatedBook = await this.bookService.getBookById(book.id);

      res.status(201).json(updatedBook);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "Ya existe un libro con ese nombre" });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  update = async (req, res) => {
    try {
      const validation = validateBookUpdate(req.body);

      if (!validation.success) {
        return res.status(400).json({
          message: validation.error.errors[0].message,
        });
      }

      const book = await this.bookService.updateBook(
        req.params.id,
        validation.data
      );

      if (req.body.genres) {
        await this.bookService.setBookGenres(book, req.body.genres);
      }

      const updatedBook = await this.bookService.getBookById(book.id);

      res.json(updatedBook);
    } catch (error) {
      if (error.message === "Libro no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "Ya existe un libro con ese nombre" });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  delete = async (req, res) => {
    try {
      await this.bookService.deleteBook(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "Libro no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === "SequelizeForeignKeyConstraintError") {
        res
          .status(400)
          .json({
            message:
              "No se puede eliminar el libro porque tiene préstamos asociados",
          });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  getLoans = async (req, res) => {
    try {
      const loans = await this.bookService.getBookLoans(req.params.id);
      res.json(loans);
    } catch (error) {
      if (error.message === "Libro no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  getGenres = async (req, res) => {
    try {
      const genres = await this.bookService.getBookGenres(req.params.id);
      res.json(genres);
    } catch (error) {
      if (error.message === "Libro no encontrado") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };
}
