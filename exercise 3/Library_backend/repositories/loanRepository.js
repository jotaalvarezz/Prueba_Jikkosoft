import { Op } from 'sequelize';

export class LoanRepository {
  constructor({ Loan }) {
    this.Loan = Loan;
  }

  findAll = async () => {
    return await this.Loan.findAll({
      include: ['book', 'member']
    });
  };

  findById = async (id) => {
    return await this.Loan.findByPk(id, {
      include: ['book', 'member']
    });
  };

  create = async (data) => {
    return await this.Loan.create(data);
  };

  update = async (loan, data) => {
    return await loan.update(data);
  };

  delete = async (loan) => {
    return await loan.destroy();
  };

  findActiveLoans = async () => {
    console.log('Buscando préstamos activos (returned_at: null)');
    const result = await this.Loan.findAll({
      where: {
        returned_at: null
      },
      include: ['book', 'member']
    });
    console.log(`Encontrados ${result.length} préstamos activos`);
    return result;
  };

  findReturnedLoans = async () => {
    console.log('Buscando préstamos devueltos (returned_at: not null)');
    const result = await this.Loan.findAll({
      where: {
        returned_at: {
          [Op.not]: null
        }
      },
      include: ['book', 'member']
    });
    console.log(`Encontrados ${result.length} préstamos devueltos`);
    return result;
  };

  countActiveLoans = async (bookId) => {
    return await this.Loan.count({
      where: {
        book_id: bookId,
        returned_at: null
      }
    });
  };
}
