import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Book extends Model {}

Book.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    author: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    library_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'libraries',
        key: 'id',
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cover_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
    underscored: true,
  }
);

// Definir las relaciones
Book.associate = (models) => {
  // Un libro pertenece a una biblioteca
  Book.belongsTo(models.Library, {
    foreignKey: 'library_id',
    as: 'library',
  });

  // Un libro tiene muchos préstamos
  Book.hasMany(models.Loan, {
    foreignKey: 'book_id',
    as: 'loans',
  });

  // Un libro tiene muchos géneros
  Book.belongsToMany(models.Genre, {
    through: 'book_genres',
    foreignKey: 'book_id',
    otherKey: 'genre_id',
    as: 'genres',
  });
};

export default Book;