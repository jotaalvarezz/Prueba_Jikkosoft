export class LibraryService {
  constructor({ libraryRepository }) {
    this.libraryRepository = libraryRepository;
  }

  getAllLibraries = async () => {
    return await this.libraryRepository.findAll();
  };

  getLibraryById = async (id) => {
    const library = await this.libraryRepository.findById(id);
    
    if (!library) {
      throw new Error('Biblioteca no encontrada');
    }
    
    return library;
  };

  createLibrary = async (data) => {
    return await this.libraryRepository.create(data);
  };

  updateLibrary = async (id, data) => {
    const library = await this.libraryRepository.findById(id);
    
    if (!library) {
      throw new Error('Biblioteca no encontrada');
    }

    return await this.libraryRepository.update(library, data);
  };

  deleteLibrary = async (id) => {
    const library = await this.libraryRepository.findById(id);
    
    if (!library) {
      throw new Error('Biblioteca no encontrada');
    }

    await this.libraryRepository.delete(library);
  };

  getLibraryBooks = async (id) => {
    const library = await this.libraryRepository.findBooksById(id);
    
    if (!library) {
      throw new Error('Biblioteca no encontrada');
    }
    
    return library.books;
  };
}

