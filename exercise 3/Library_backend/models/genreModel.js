import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Genre extends Model {}

Genre.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Genre',
    tableName: 'genres',
    underscored: true,
  }
);

// Definir las relaciones
Genre.associate = (models) => {
  // Un género tiene muchos libros
  Genre.belongsToMany(models.Book, {
    through: 'book_genres',
    foreignKey: 'genre_id',
    otherKey: 'book_id',
    as: 'books',
  });
};

export default Genre;
