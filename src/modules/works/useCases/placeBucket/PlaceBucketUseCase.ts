import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IWorksRepository } from "../../repositories/IWorksRepository";
import { WorkStatus } from "../../infra/typeorm/entities/Work";

@injectable()
class PlaceBucketUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) { }

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('Missing work id')
    }

    let work = await this.worksRepository.findById(id)

    if (!work) {
      throw new AppError('Work not found')
    }

    if (work.status !== WorkStatus.PENDING) {
      throw new AppError(`This work is ${work.status}. The status to place a bucked should be pending`)
    }

    work = {
      ...work,
      status: WorkStatus.PLACED
    }

    await this.worksRepository.create(work)

    return
  }
}

export { PlaceBucketUseCase }