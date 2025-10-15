export class BookService {
  constructor({ bookRepository }) {
    this.bookRepository = bookRepository;
  }

  getAllBooks = async ({ name }) => {
    return await this.bookRepository.findAll({ name });
  };

  getBookById = async (id) => {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return book;
  };

  createBook = async (data) => {
    return await this.bookRepository.create(data);
  };

  updateBook = async (id, data) => {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return await this.bookRepository.update(book, data);
  };

  deleteBook = async (id) => {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    await this.bookRepository.delete(book);
  };

  getBookLoans = async (id) => {
    const book = await this.bookRepository.findLoansById(id);

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return book.loans;
  };

  getBookGenres = async (id) => {
    const book = await this.bookRepository.findGenresById(id);

    if (!book) {
      throw new Error("Libro no encontrado");
    }

    return book.genres;
  };

  setBookGenres = async (book, genreIds) => {
    return await this.bookRepository.setGenres(book, genreIds);
  };
}
