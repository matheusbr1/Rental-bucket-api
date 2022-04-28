import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { Customer } from "../infra/typeorm/entities/Customer";

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>
  list(): Promise<Customer[]>
  findById(id: string): Promise<Customer>
  findByCPF_CNPJ(CPF_CNPJ: number): Promise<Customer>
}

export { ICustomerRepository }