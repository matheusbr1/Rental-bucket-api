import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";
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
}

export { CustomersRepositoryInMemory }