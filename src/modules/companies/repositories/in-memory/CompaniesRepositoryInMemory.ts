import { ICreateCompanyDTO } from "../../dtos/ICreateCompanyDTO";
import { Company } from "../../infra/typeorm/entities/Company";
import { ICompaniesRepository } from "../ICompaniesRepository";

class CompaniesRepositoryInMemory implements ICompaniesRepository {
  private companies: Company[] = []

  async create(data: ICreateCompanyDTO): Promise<Company> {
    const company = new Company()

    Object.assign(company, data)

    this.companies.push(company)

    return company
  }

  async list(): Promise<Company[]> {
    return this.companies
  }

  async findById(id: string): Promise<Company> {
    return this.companies.find(company => company.id === id)
  }

  async findByName(name: string): Promise<Company> {
    return this.companies.find(company => company.name === name)
  }

  async delete(id: string): Promise<void> {
    this.companies = this.companies.filter(company => company.id !== id)
  }
}

export { CompaniesRepositoryInMemory }