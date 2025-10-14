export class MemberService {
  constructor({ memberRepository }) {
    this.memberRepository = memberRepository;
  }

  getAllMembers = async () => {
    return await this.memberRepository.findAll();
  };

  getMemberById = async (id) => {
    const member = await this.memberRepository.findById(id);
    
    if (!member) {
      throw new Error('Miembro no encontrado');
    }
    
    return member;
  };

  createMember = async (data) => {
    return await this.memberRepository.create(data);
  };

  updateMember = async (id, data) => {
    const member = await this.memberRepository.findById(id);
    
    if (!member) {
      throw new Error('Miembro no encontrado');
    }

    return await this.memberRepository.update(member, data);
  };

  deleteMember = async (id) => {
    const member = await this.memberRepository.findById(id);
    
    if (!member) {
      throw new Error('Miembro no encontrado');
    }

    await this.memberRepository.delete(member);
  };

  getMemberLoans = async (id) => {
    const member = await this.memberRepository.findLoansById(id);
    
    if (!member) {
      throw new Error('Miembro no encontrado');
    }
    
    return member.loans;
  };

  getMemberActiveLoans = async (id) => {
    const member = await this.memberRepository.findActiveLoansById(id);
    
    if (!member) {
      throw new Error('Miembro no encontrado');
    }
    
    return member.loans;
  };
}
