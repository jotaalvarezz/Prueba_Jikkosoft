export class LibraryRepository {
  constructor({ Library }) {
    this.Library = Library;
  }

  findAll = async () => {
    return await this.Library.findAll({
      include: ['books']
    });
  };

  findById = async (id) => {
    return await this.Library.findByPk(id, {
      include: ['books']
    });
  };

  create = async (data) => {
    return await this.Library.create(data);
  };

  update = async (library, data) => {
    return await library.update(data);
  };

  delete = async (library) => {
    return await library.destroy();
  };

  findBooksById = async (id) => {
    const library = await this.Library.findByPk(id, {
      include: [{
        association: 'books',
        include: ['genres']
      }]
    });
    return library;
  };
}

