import { validateLibrary, validateLibraryUpdate } from '../schemas/librarySchema.js';

export class LibraryController {
  constructor({ libraryService }) {
    this.libraryService = libraryService;
  }

  getLibrary = async (req, res) => {
    try {
      const library = await this.libraryService.getFirstLibrary()
      res.json(library)
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  getAll = async (req, res) => {
    try {
      const libraries = await this.libraryService.getAllLibraries();
      res.json(libraries);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const library = await this.libraryService.getLibraryById(req.params.id);
      res.json(library);
    } catch (error) {
      if (error.message === 'Biblioteca no encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const validation = validateLibrary(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const library = await this.libraryService.createLibrary(validation.data);
      res.status(201).json(library);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Ya existe una biblioteca con ese nombre o email' });
      } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  update = async (req, res) => {
    try {
      const validation = validateLibraryUpdate(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const library = await this.libraryService.updateLibrary(req.params.id, validation.data);
      res.json(library);
    } catch (error) {
      if (error.message === 'Biblioteca no encontrada') {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Ya existe una biblioteca con ese nombre o email' });
      } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  delete = async (req, res) => {
    try {
      await this.libraryService.deleteLibrary(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Biblioteca no encontrada') {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({ message: 'No se puede eliminar la biblioteca porque tiene libros asociados' });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  getBooks = async (req, res) => {
    try {
      const books = await this.libraryService.getLibraryBooks(req.params.id);
      res.json(books);
    } catch (error) {
      if (error.message === 'Biblioteca no encontrada') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };
}
