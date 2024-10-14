import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";
import { IListCustomersInDTO, IListCustomersOutDTO } from "../../dtos/IListCustomersDTO";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomerRepository } from "../ICustomersRepository";

class CustomersRepositoryInMemory implements ICustomerRepository {
  private customers: Customer[] = []

  async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = new Customer()

    Object.assign(customer, data)

    this.customers.push(customer)

    return customer
  }

  async list(): Promise<Customer[]> {
    return this.customers
  }

  async findByCPF_CNPJ(CPF_CNPJ: number): Promise<Customer> {
    return this.customers.find(customer => customer.CPF_CNPJ === CPF_CNPJ)
  }

  async listByCompanyId(data: IListCustomersInDTO): Promise<IListCustomersOutDTO> {
    const customers = this.customers.filter(customer => customer.company_id === data.company_id)
    return {
      customers,
      pageCount: 0,
      total: customers.length
    }
  }

  async findById(id: string): Promise<Customer> {
    return this.customers.find(customer => customer.id === id)
  }

  async delete(id: string): Promise<void> {
    this.customers = this.customers.filter(customer => customer.id !== id)
  }
}

export { CustomersRepositoryInMemory }