import { Company } from "../infra/typeorm/entities/Company";

interface ICompaniesRepository {
  list(): Promise<Company[]>
  create(data: {
    name: string
    hasSubscription?: boolean
  }): Promise<Company>
  findById(id: string): Promise<Company>
  findByName(name: string): Promise<Company>
  delete(id: string): Promise<void>
}

export { ICompaniesRepository }