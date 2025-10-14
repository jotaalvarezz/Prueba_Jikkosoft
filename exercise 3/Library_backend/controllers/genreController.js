import { validateGenre, validateGenreUpdate } from '../schemas/genreSchema.js';

export class GenreController {
  constructor({ genreService }) {
    this.genreService = genreService;
  }

  getAll = async (req, res) => {
    try {
      const genres = await this.genreService.getAllGenres();
      res.json(genres);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const genre = await this.genreService.getGenreById(req.params.id);
      res.json(genre);
    } catch (error) {
      if (error.message === 'Género no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const validation = validateGenre(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const genre = await this.genreService.createGenre(validation.data);
      res.status(201).json(genre);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Ya existe un género con ese nombre' });
      } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  update = async (req, res) => {
    try {
      const validation = validateGenreUpdate(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const genre = await this.genreService.updateGenre(req.params.id, validation.data);
      res.json(genre);
    } catch (error) {
      if (error.message === 'Género no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Ya existe un género con ese nombre' });
      } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  delete = async (req, res) => {
    try {
      await this.genreService.deleteGenre(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Género no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({ message: 'No se puede eliminar el género porque tiene libros asociados' });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  getBooks = async (req, res) => {
    try {
      const books = await this.genreService.getGenreBooks(req.params.id);
      res.json(books);
    } catch (error) {
      if (error.message === 'Género no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };
}
