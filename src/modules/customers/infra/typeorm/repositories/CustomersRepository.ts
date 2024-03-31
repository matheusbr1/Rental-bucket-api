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

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById(id: string): Promise<Customer> {
    let customer = await this.repository
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.contacts", "contacts")
      .leftJoinAndSelect("customer.adresses", "adresses")
      .where({ id })
      .getOne()

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

    return customers
  }

  async listByCompanyId(company_id: string): Promise<Customer[]> {
    const customers = await this.repository
      .createQueryBuilder("customers")
      .leftJoinAndSelect("customers.contacts", "contacts")
      .leftJoinAndSelect("customers.adresses", "adresses")
      .where("customers.company_id = :company_id", { company_id })
      .getMany()

    return customers
  }
}

export { CustomersRepository }