import { validateLoan, validateLoanUpdate, validateReturnBook } from '../schemas/loanSchema.js';

export class LoanController {
  constructor({ loanService }) {
    this.loanService = loanService;
  }

  getAll = async (req, res) => {
    try {
      const loans = await this.loanService.getAllLoans();
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const loan = await this.loanService.getLoanById(req.params.id);
      res.json(loan);
    } catch (error) {
      if (error.message === 'Préstamo no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const validation = validateLoan(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const loan = await this.loanService.createLoan(validation.data);
      
      const updatedLoan = await this.loanService.getLoanById(loan.id);
      
      res.status(201).json(updatedLoan);
    } catch (error) {
      if (error.message === 'El libro ya está prestado') {
        return res.status(400).json({ message: error.message });
      }
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  update = async (req, res) => {
    try {
      const validation = validateLoanUpdate(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const loan = await this.loanService.updateLoan(req.params.id, validation.data);
      
      const updatedLoan = await this.loanService.getLoanById(loan.id);
      
      res.json(updatedLoan);
    } catch (error) {
      if (error.message === 'Préstamo no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  delete = async (req, res) => {
    try {
      await this.loanService.deleteLoan(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Préstamo no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  returnBook = async (req, res) => {
    try {
      const validation = validateReturnBook(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const loan = await this.loanService.returnBook(
        req.params.id, 
        validation.data.returned_at
      );
      
      const updatedLoan = await this.loanService.getLoanById(loan.id);
      
      res.json(updatedLoan);
    } catch (error) {
      if (error.message === 'Préstamo no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'Este libro ya fue devuelto') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  getActiveLoans = async (req, res) => {
    try {
      const loans = await this.loanService.getActiveLoans();
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}
