export class GenreRepository {
  constructor({ Genre }) {
    this.Genre = Genre;
  }

  findAll = async () => {
    return await this.Genre.findAll({
      include: ['books']
    });
  };

  findById = async (id) => {
    return await this.Genre.findByPk(id, {
      include: ['books']
    });
  };

  create = async (data) => {
    return await this.Genre.create(data);
  };

  update = async (genre, data) => {
    return await genre.update(data);
  };

  delete = async (genre) => {
    return await genre.destroy();
  };

  findBooksById = async (id) => {
    const genre = await this.Genre.findByPk(id, {
      include: ['books']
    });
    return genre;
  };
}
