import { inject, injectable } from "tsyringe"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"
import { AppError } from "../../../../shared/errors/AppError";
import { IListTrucksInDTO, IListTrucksOutDTO } from "../../dtos/IListTruckDTO";

@injectable()
class ListTrucksUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository
  ) { }

  async execute({
    company_id,
    page,
    limit
  }: IListTrucksInDTO): Promise<IListTrucksOutDTO> {
    if (!company_id) {
      throw new AppError("company_id is missing");
    }

    if (!page) {
      throw new AppError("page is missing");
    }

    const output = await this.trucksRepository.listByCompanyId({
      company_id,
      limit,
      page
    })

    return output
  }
}

export { ListTrucksUseCase }