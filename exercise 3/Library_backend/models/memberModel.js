import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Member extends Model {}

Member.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    cc: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    names: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(190),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    modelName: 'Member',
    tableName: 'members',
    underscored: true,
  }
);

// Definir las relaciones
Member.associate = (models) => {
  // Un miembro tiene muchos préstamos
  Member.hasMany(models.Loan, {
    foreignKey: 'member_id',
    as: 'loans',
  });
};

export default Member;