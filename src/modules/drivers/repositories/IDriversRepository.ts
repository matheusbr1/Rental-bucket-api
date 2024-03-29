import { ICreateDriverDTO } from "../dtos/ICreateDriverDTO";
import { Driver } from "../infra/typeorm/entities/Driver";

// Meu contrato para o DB, liskov substitution principle 
interface IDriversRepository {
  create(data: ICreateDriverDTO): Promise<Driver>
  list(): Promise<Driver[]>
  listByCompanyId(company_id: string): Promise<Driver[]>
  findById(id: string): Promise<Driver>
  findByCPF(CPF: number): Promise<Driver>
  delete(id: string): Promise<void>
}

export { IDriversRepository }