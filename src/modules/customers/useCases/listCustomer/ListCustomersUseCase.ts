import { inject, injectable } from "tsyringe";
import { ICustomerRepository } from "../../repositories/ICustomersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IListCustomersInDTO, IListCustomersOutDTO } from "../../dtos/IListCustomersDTO";

@injectable()
class ListCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository
  ) { }

  async execute({
    company_id,
    page,
    limit
  }: IListCustomersInDTO): Promise<IListCustomersOutDTO> {
    if (!company_id) {
      throw new AppError("company_id is missing");
    }

    if (!page) {
      throw new AppError("page is missing");
    }

    const output = await this.customersRepository.listByCompanyId({
      company_id,
      limit,
      page
    })

    return output
  }
}

export { ListCustomersUseCase }