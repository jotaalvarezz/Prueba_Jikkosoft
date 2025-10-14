export class LoanService {
  constructor({ loanRepository }) {
    this.loanRepository = loanRepository;
  }

  getAllLoans = async () => {
    return await this.loanRepository.findAll();
  };

  getLoanById = async (id) => {
    const loan = await this.loanRepository.findById(id);
    
    if (!loan) {
      throw new Error('Préstamo no encontrado');
    }
    
    return loan;
  };

  createLoan = async (data) => {
    const activeLoans = await this.loanRepository.countActiveLoans(data.book_id);
    
    if (activeLoans > 0) {
      throw new Error('El libro ya está prestado');
    }

    return await this.loanRepository.create(data);
  };

  updateLoan = async (id, data) => {
    const loan = await this.loanRepository.findById(id);
    
    if (!loan) {
      throw new Error('Préstamo no encontrado');
    }

    return await this.loanRepository.update(loan, data);
  };

  deleteLoan = async (id) => {
    const loan = await this.loanRepository.findById(id);
    
    if (!loan) {
      throw new Error('Préstamo no encontrado');
    }

    await this.loanRepository.delete(loan);
  };

  returnBook = async (id, returnedAt) => {
    const loan = await this.loanRepository.findById(id);
    
    if (!loan) {
      throw new Error('Préstamo no encontrado');
    }

    if (loan.returned_at) {
      throw new Error('Este libro ya fue devuelto');
    }

    return await this.loanRepository.update(loan, {
      returned_at: returnedAt || new Date()
    });
  };

  getActiveLoans = async () => {
    return await this.loanRepository.findActiveLoans();
  };
}
