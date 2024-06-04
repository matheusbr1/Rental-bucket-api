import { inject, injectable } from "tsyringe";
import { IWorksRepository } from "../../repositories/IWorksRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IListWorksInDTO, IListWorksOutDTO } from "../../dtos/IListWorksDTO";

@injectable()
class ListWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) { }

  async execute({
    company_id,
    page,
    limit,
    status
  }: IListWorksInDTO): Promise<IListWorksOutDTO> {
    if (!company_id) {
      throw new AppError("company_id is missing");
    }

    if (!page) {
      throw new AppError("page is missing");
    }

    const output = await this.worksRepository.listByCompanyId({
      company_id,
      limit,
      page,
      status
    })

    return output
  }
}

export { ListWorkUseCase }