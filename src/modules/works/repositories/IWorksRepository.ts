import { Work } from "../models/Work";

// Data Transfer Object -> DTO
interface ICreateWorkDTO {
  customer_CPF_CNPJ: number
  driver_CPF: number
  truck: string
  equipment: string
  quantity: number
  type: string
}

// Meu contrato para o DB, liskov substitution principle 
interface IWorksRepository {
  create(data: ICreateWorkDTO): void
  list(): Work[]
  findByClient(CPF_CNPJ: number): Work | Work[]
}

export { IWorksRepository, ICreateWorkDTO }