import { ICreateDriverDTO } from "../dtos/ICreateDriverDTO";
import { Driver } from "../entities/Driver";

// Meu contrato para o DB, liskov substitution principle 
interface IDriversRepository {
  create(data: ICreateDriverDTO): void
  list(): Driver[]
  findByCPF(CPF: number): Driver
}

export { IDriversRepository }