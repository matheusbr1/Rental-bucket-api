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

  async findByCPF_CNPJ(CPF_CNPJ: number): Promise<Customer> {
    return await this.repository.findOne({ CPF_CNPJ })
  }

  async list(): Promise<Customer[]> {
    let customers = await this.repository
    .createQueryBuilder("customers")
    .leftJoinAndSelect("customers.contacts", "contacts")
    .leftJoinAndSelect("customers.adresses", "adresses")
    .getMany()

    customers = customers.map((customer) => {
      const contacts = customer.contacts.map(contact => {
        const updatedContact = contact

        if (!contact.customer_id)
          delete updatedContact.customer_id
        if (!contact.driver_id) 
          delete updatedContact.driver_id

        return updatedContact
      })

      if (customer.person_type === 'F') {
        let fisicCustomer = customer
        delete fisicCustomer.company_name
        delete fisicCustomer.fantasy_name
        return { ...fisicCustomer, contacts }
      }

      if (customer.person_type === 'J') {
        const juridicCustomer = customer
        delete juridicCustomer.name
        return { ...juridicCustomer, contacts}
      }
    })

    return customers
  }
}

export { CustomersRepository }