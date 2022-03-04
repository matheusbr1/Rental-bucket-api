import { Customer } from "../../models/Customer";
import { ICreateCustomerDTO, ICustomerRepository } from "../ICustomersRepository";

class CustomersRepository implements ICustomerRepository {
  private customers: Customer[] = []

  private static INSTANCE: CustomersRepository

  private constructor () {
    this.customers = []
  }
  
  // SINGLETON pattern
  public static getInstance(): CustomersRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new CustomersRepository()
    }

    return this.INSTANCE
  }

  create(data: ICreateCustomerDTO): void {
    const customer = new Customer()

    Object.assign(customer, {
      ...data,
      created_at: new Date()
    })

    this.customers.push(customer)
  }

  list(): Customer[] {
    return this.customers
  }

  findByCPF(CPF: number): Customer {
    const fisicPersonCustomers = this.customers.filter(customer => customer.personType === 'F')
    const customer = fisicPersonCustomers.find(customer => customer.CPF_CNPJ === CPF)
    return customer
  }

  findByCNPJ(CNPJ: number): Customer {
    const legalPersonCustomers = this.customers.filter(customer => customer.personType === 'J')
    const customer = legalPersonCustomers.find(customer => customer.CPF_CNPJ === CNPJ)
    return customer
  }
}

export { CustomersRepository }