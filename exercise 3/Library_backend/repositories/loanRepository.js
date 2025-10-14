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
    return await this.Loan.findAll({
      where: {
        returned_at: null
      },
      include: ['book', 'member']
    });
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
