export class BookRepository {
  constructor({ Book }) {
    this.Book = Book;
  }

  findAll = async () => {
    return await this.Book.findAll({
      include: ['library', 'genres']
    });
  };

  findById = async (id) => {
    return await this.Book.findByPk(id, {
      include: ['library', 'genres', 'loans']
    });
  };

  create = async (data) => {
    return await this.Book.create(data);
  };

  update = async (book, data) => {
    return await book.update(data);
  };

  delete = async (book) => {
    return await book.destroy();
  };

  findLoansById = async (id) => {
    const book = await this.Book.findByPk(id, {
      include: [{
        association: 'loans',
        include: ['member']
      }]
    });
    return book;
  };

  findGenresById = async (id) => {
    const book = await this.Book.findByPk(id, {
      include: ['genres']
    });
    return book;
  };

  setGenres = async (book, genreIds) => {
    return await book.setGenres(genreIds);
  };
}
