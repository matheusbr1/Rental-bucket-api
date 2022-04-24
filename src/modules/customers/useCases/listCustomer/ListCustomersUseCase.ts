import { inject, injectable } from "tsyringe";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomerRepository } from "../../repositories/ICustomersRepository";

@injectable()
class ListCustomersUseCase {
  constructor (
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  async execute(): Promise<Customer[]> {
    const customers = await this.customersRepository.list()

    return customers
  }
}

export { ListCustomersUseCase }