import { inject, injectable } from "tsyringe";
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomerRepository } from "../../repositories/ICustomersRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class ListCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) { }

  async execute(company_id: string): Promise<Customer[]> {
    if (!company_id) {
      throw new AppError("company_id is missing");
    }

    const customers = await this.customersRepository.listByCompanyId(company_id)

    return customers
  }
}

export { ListCustomersUseCase }