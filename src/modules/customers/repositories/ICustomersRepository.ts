import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { Customer } from "../infra/typeorm/entities/Customer";

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>
  list(): Promise<Customer[]>
  listByCompanyId(company_id: string): Promise<Customer[]>
  findById(id: string): Promise<Customer>
  findByCPF_CNPJ(CPF_CNPJ: number): Promise<Customer>
  delete(id: string): Promise<void>
}

export { ICustomerRepository }