import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../repositories/ICustomersRepository";

@injectable()
class DeleteCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.customersRepository.delete(id)

    return
  }
}

export { DeleteCustomerUseCase }