import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomerRepository } from "../../repositories/ICustomersRepository";

@injectable()
class CustomerDetailUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ){}

  async execute(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findById(id)

    if(!customer) {
      throw new AppError('Register not found', 404)
    }

    return customer
  }
}

export { CustomerDetailUseCase }