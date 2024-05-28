import { ICreateDriverDTO } from "../dtos/ICreateDriverDTO";
import { IListDriversInDTO, IListDriversOutDTO } from "../dtos/IListDriversDTO";
import { Driver } from "../infra/typeorm/entities/Driver";

// Meu contrato para o DB, liskov substitution principle 
interface IDriversRepository {
  create(data: ICreateDriverDTO): Promise<Driver>
  list(): Promise<Driver[]>
  listByCompanyId(data: IListDriversInDTO): Promise<IListDriversOutDTO>
  findById(id: string): Promise<Driver>
  findByCPF(CPF: number): Promise<Driver>
  delete(id: string): Promise<void>
}

export { IDriversRepository }