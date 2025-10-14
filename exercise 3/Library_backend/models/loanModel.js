import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Loan extends Model {}

Loan.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    book_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id',
      },
    },
    member_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'members',
        key: 'id',
      },
    },
    loan_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    returned_at: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isAfterLoanDate(value) {
          if (value && value <= this.loan_date) {
            throw new Error('La fecha de devolución debe ser posterior a la fecha del préstamo');
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Loan',
    tableName: 'loans',
    underscored: true,
  }
);

// Definir las relaciones
Loan.associate = (models) => {
  // Un préstamo pertenece a un libro
  Loan.belongsTo(models.Book, {
    foreignKey: 'book_id',
    as: 'book',
  });

  // Un préstamo pertenece a un miembro
  Loan.belongsTo(models.Member, {
    foreignKey: 'member_id',
    as: 'member',
  });
};

export default Loan;
