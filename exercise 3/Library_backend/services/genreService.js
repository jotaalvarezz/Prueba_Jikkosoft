export class GenreService {
  constructor({ genreRepository }) {
    this.genreRepository = genreRepository;
  }

  getAllGenres = async () => {
    return await this.genreRepository.findAll();
  };

  getGenreById = async (id) => {
    const genre = await this.genreRepository.findById(id);
    
    if (!genre) {
      throw new Error('Género no encontrado');
    }
    
    return genre;
  };

  createGenre = async (data) => {
    return await this.genreRepository.create(data);
  };

  updateGenre = async (id, data) => {
    const genre = await this.genreRepository.findById(id);
    
    if (!genre) {
      throw new Error('Género no encontrado');
    }

    return await this.genreRepository.update(genre, data);
  };

  deleteGenre = async (id) => {
    const genre = await this.genreRepository.findById(id);
    
    if (!genre) {
      throw new Error('Género no encontrado');
    }

    await this.genreRepository.delete(genre);
  };

  getGenreBooks = async (id) => {
    const genre = await this.genreRepository.findBooksById(id);
    
    if (!genre) {
      throw new Error('Género no encontrado');
    }
    
    return genre.books;
  };
}
