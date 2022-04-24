import { getRepository, Repository } from "typeorm"
import { ICreateCustomerDTO } from "../../../dtos/ICreateCustomerDTO"
import { ICustomerRepository } from "../../../repositories/ICustomersRepository"
import { Customer } from "../entities/Customer"

class CustomersRepository implements ICustomerRepository {
  repository: Repository<Customer>

  constructor() {
    this.repository = getRepository(Customer)
  }

  async create(data: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create(data)

    await this.repository.save(customer)

    return customer
  }

  async list(): Promise<Customer[]> {
    let customers = await this.repository.find()

    customers = customers.map((customer) => {
      if (customer.person_type === 'F') {
        const fisicCustomer = customer
        delete fisicCustomer.company_name
        delete fisicCustomer.fantasy_name
        return fisicCustomer
      }

      if (customer.person_type === 'J') {
        const juridicCustomer = customer
        delete juridicCustomer.name
        return juridicCustomer
      }
    })

    return customers
  }

  async findByCPF_CNPJ(CPF_CNPJ: number): Promise<Customer> {
    return await this.repository.findOne({ CPF_CNPJ })
  }
}

export { CustomersRepository }