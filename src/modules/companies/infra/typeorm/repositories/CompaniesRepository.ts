import { Repository, getRepository } from 'typeorm'
import { ICreateCompanyDTO } from '../../../dtos/ICreateCompanyDTO'
import { ICompaniesRepository } from '../../../repositories/ICompaniesRepository'
import { Company } from '../entities/Company'

class CompaniesRepository implements ICompaniesRepository {
  repository: Repository<Company>

  constructor() {
    this.repository = getRepository(Company)
  }

  async findById(id: string): Promise<Company> {
    const company = await this.repository.createQueryBuilder('company')
      .leftJoinAndSelect("company.address", "address")
      .where({ id })
      .getOne()
    return company;
  }

  async list(): Promise<Company[]> {
    let companies = await this.repository.createQueryBuilder("companies")
      .leftJoinAndSelect("companies.address", "address")
      .getMany()

    return companies
  }

  async create(data: ICreateCompanyDTO): Promise<Company> {
    const company = this.repository.create(data)
    await this.repository.save(company)
    return company
  }

  async findByName(name: string): Promise<Company> {
    return this.repository
      .createQueryBuilder("company")
      .where("LOWER(company.name) ILIKE LOWER(:name)", { name: `%${name}%` })
      .getOne();
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export { CompaniesRepository }