import { inject, injectable } from "tsyringe"
import { IDriversRepository } from "../../repositories/IDriversRepository"
import { AppError } from "../../../../shared/errors/AppError";
import { IListDriversInDTO, IListDriversOutDTO } from "../../dtos/IListDriversDTO";

@injectable()
class ListDriversUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository
  ) { }

  async execute({
    company_id,
    page,
    limit
  }: IListDriversInDTO): Promise<IListDriversOutDTO> {
    if (!company_id) {
      throw new AppError("company_id is missing");
    }

    if (!page) {
      throw new AppError("page is missing");
    }

    const output = await this.driversRepository.listByCompanyId({
      company_id,
      limit,
      page
    })

    return output
  }
}

export { ListDriversUseCase }