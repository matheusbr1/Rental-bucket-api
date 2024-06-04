import { ICreateWorkDTO } from "../dtos/ICreateWorkDTO";
import { IListWorksInDTO, IListWorksOutDTO } from "../dtos/IListWorksDTO";
import { Work } from "../infra/typeorm/entities/Work";

// Meu contrato para o DB, liskov substitution principle
interface IWorksRepository {
  create(data: ICreateWorkDTO): Promise<Work>
  list(): Promise<Work[]>
  listByCompanyId(data: IListWorksInDTO): Promise<IListWorksOutDTO>
  findById(id: string): Promise<Work>
  delete(id: string): Promise<void>
}

export { IWorksRepository }