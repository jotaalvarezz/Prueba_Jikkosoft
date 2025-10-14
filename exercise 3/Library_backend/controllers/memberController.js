import { validateMember, validateMemberUpdate } from '../schemas/memberSchema.js';

export class MemberController {
  constructor({ memberService }) {
    this.memberService = memberService;
  }

  getAll = async (req, res) => {
    try {
      const members = await this.memberService.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  findById = async (req, res) => {
    try {
      const member = await this.memberService.getMemberById(req.params.id);
      res.json(member);
    } catch (error) {
      if (error.message === 'Miembro no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  create = async (req, res) => {
    try {
      const validation = validateMember(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const member = await this.memberService.createMember(validation.data);
      res.status(201).json(member);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Ya existe un miembro con ese CC o email' });
      } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  update = async (req, res) => {
    try {
      const validation = validateMemberUpdate(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: validation.error.errors[0].message
        });
      }

      const member = await this.memberService.updateMember(req.params.id, validation.data);
      res.json(member);
    } catch (error) {
      if (error.message === 'Miembro no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Ya existe un miembro con ese CC o email' });
      } else if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  delete = async (req, res) => {
    try {
      await this.memberService.deleteMember(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Miembro no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        res.status(400).json({ message: 'No se puede eliminar el miembro porque tiene préstamos asociados' });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  getLoans = async (req, res) => {
    try {
      const loans = await this.memberService.getMemberLoans(req.params.id);
      res.json(loans);
    } catch (error) {
      if (error.message === 'Miembro no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };

  getActiveLoans = async (req, res) => {
    try {
      const loans = await this.memberService.getMemberActiveLoans(req.params.id);
      res.json(loans);
    } catch (error) {
      if (error.message === 'Miembro no encontrado') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  };
}
