import { ICustomerRepository } from "../../repositories/ICustomersRepository";

class ListCustomersUseCase {
  constructor (private customersRepository: ICustomerRepository) {}

  execute() {
    const customers = this.customersRepository.list()

    return customers
  }
}

export { ListCustomersUseCase }