import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { IListCustomersInDTO, IListCustomersOutDTO } from "../dtos/IListCustomersDTO";
import { Customer } from "../infra/typeorm/entities/Customer";

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>
  list(): Promise<Customer[]>
  listByCompanyId(data: IListCustomersInDTO): Promise<IListCustomersOutDTO>
  findById(id: string): Promise<Customer>
  findByCPF_CNPJ(CPF_CNPJ: number): Promise<Customer>
  delete(id: string): Promise<void>
}

export { ICustomerRepository }