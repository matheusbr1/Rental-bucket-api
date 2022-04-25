import { ICreateWorkDTO } from "../dtos/ICreateWorkDTO";
import { Work } from "../infra/typeorm/entities/Work";

// Meu contrato para o DB, liskov substitution principle
interface IWorksRepository {
  create(data: ICreateWorkDTO): void
  list(): Work[]
  findByClient(CPF_CNPJ: number): Work | Work[]
}

export { IWorksRepository }