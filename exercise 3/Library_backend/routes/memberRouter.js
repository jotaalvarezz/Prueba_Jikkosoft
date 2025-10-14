import { Router } from 'express';
import { MemberController } from '../controllers/memberController.js';
import { MemberService } from '../services/memberService.js';
import { MemberRepository } from '../repositories/memberRepository.js';

export const createMemberRoutes = ({ Member }) => {
  const router = Router();
  
  const memberRepository = new MemberRepository({ Member });
  const memberService = new MemberService({ memberRepository });
  const memberController = new MemberController({ memberService });

  router.get('/members', memberController.getAll);
  router.get('/members/:id', memberController.findById);
  router.post('/members', memberController.create);
  router.put('/members/:id', memberController.update);
  router.delete('/members/:id', memberController.delete);
  router.get('/members/:id/loans', memberController.getLoans);
  router.get('/members/:id/active-loans', memberController.getActiveLoans);

  return router;
};

export default createMemberRoutes;