import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { Customer } from "../infra/typeorm/entities/Customer";

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): void
  list(): Customer[]
  findByCPF(CPF: number): Customer
  findByCNPJ(CNPJ: number): Customer
}

export { ICustomerRepository }