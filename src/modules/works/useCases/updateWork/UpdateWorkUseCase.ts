import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateWorkDTO } from "../../dtos/ICreateWorkDTO";
import { Work } from "../../infra/typeorm/entities/Work";
import { IWorksRepository } from "../../repositories/IWorksRepository";

@injectable()
class UpdateWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  async execute(id: string, data: ICreateWorkDTO): Promise<Work> {
    if (!id) {
      new AppError('Missing work id')
    }

    let work = await this.worksRepository.findById(id)

    if (!work) {
      new AppError('Work not found')
    }
    
    work = {
      id: work.id,
      ...data
    } as Work

    const updatedWork = await this.worksRepository.create(work)

    return updatedWork
  }
}

export { UpdateWorkUseCase }