import { sequelize } from '../config/database.js';
import Library from './libraryModel.js';
import Book from './bookModel.js';
import Genre from './genreModel.js';
import Member from './memberModel.js';
import Loan from './loanModel.js';

const models = {
  Library,
  Book,
  Genre,
  Member,
  Loan,
};

// Configurar asociaciones
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;

export default models;

