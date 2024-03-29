import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";
import { Company } from "../infra/typeorm/entities/Company";

interface ICompaniesRepository {
  list(): Promise<Company[]>
  create(data: ICreateCompanyDTO): Promise<Company>
  findByName(name: string): Promise<Company>
}

export { ICompaniesRepository }