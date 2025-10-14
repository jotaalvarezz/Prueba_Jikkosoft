import { Router } from 'express';
import { LoanController } from '../controllers/loanController.js';
import { LoanService } from '../services/loanService.js';
import { LoanRepository } from '../repositories/loanRepository.js';

export const createLoanRoutes = ({ Loan }) => {
  const router = Router();
  
  const loanRepository = new LoanRepository({ Loan });
  const loanService = new LoanService({ loanRepository });
  const loanController = new LoanController({ loanService });

  router.get('/loans', loanController.getAll);
  router.get('/loans/:id', loanController.findById);
  router.post('/loans', loanController.create);
  router.put('/loans/:id', loanController.update);
  router.delete('/loans/:id', loanController.delete);
  router.post('/loans/:id/return', loanController.returnBook);
  router.get('/loans/active', loanController.getActiveLoans);

  return router;
};

export default createLoanRoutes;
