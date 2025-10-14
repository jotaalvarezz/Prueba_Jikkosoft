import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Library extends Model {}

Library.init(
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
    address: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(190),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(190),
      allowNull: true,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Library',
    tableName: 'libraries',
    underscored: true, // para usar created_at en lugar de createdAt
  }
);

// Definir las relaciones
Library.associate = (models) => {
  // Una biblioteca tiene muchos libros
  Library.hasMany(models.Book, {
    foreignKey: 'library_id',
    as: 'books',
  });
};

export default Library;