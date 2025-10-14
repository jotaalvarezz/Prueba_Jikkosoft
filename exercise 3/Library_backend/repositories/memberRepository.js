export class MemberRepository {
  constructor({ Member }) {
    this.Member = Member;
  }

  findAll = async () => {
    return await this.Member.findAll({
      include: ['loans']
    });
  };

  findById = async (id) => {
    return await this.Member.findByPk(id, {
      include: [{
        association: 'loans',
        include: ['book']
      }]
    });
  };

  create = async (data) => {
    return await this.Member.create(data);
  };

  update = async (member, data) => {
    return await member.update(data);
  };

  delete = async (member) => {
    return await member.destroy();
  };

  findLoansById = async (id) => {
    const member = await this.Member.findByPk(id, {
      include: [{
        association: 'loans',
        include: ['book']
      }]
    });
    return member;
  };

  findActiveLoansById = async (id) => {
    const member = await this.Member.findByPk(id, {
      include: [{
        association: 'loans',
        include: ['book'],
        where: {
          returned_at: null
        }
      }]
    });
    return member;
  };
}
