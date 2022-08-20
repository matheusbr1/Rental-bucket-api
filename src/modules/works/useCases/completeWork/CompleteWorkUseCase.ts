import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IWorksRepository } from "../../repositories/IWorksRepository";

@injectable()
class CompleteWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      new AppError('Missing work id')
    }

    let work =  await this.worksRepository.findById(id)

    if (!work) {
      new AppError('Work not found')
    }

    work = {
      ...work,
      is_done: true
    }

    await this.worksRepository.create(work)

    return
  }
}

export { CompleteWorkUseCase }