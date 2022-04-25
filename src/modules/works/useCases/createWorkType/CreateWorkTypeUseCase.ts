import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { WorkType } from "../../infra/typeorm/entities/WorkType";
import { IWorkTypesRepository } from "../../repositories/IWorkTypesRepository";

@injectable()
class CreateWorkTypeUseCase {
  constructor(
    @inject('WorkTypesRepository')
    private workTypesRepository: IWorkTypesRepository
  ) {}

  async execute({ name }: ICreateWorkTypeDTO): Promise<WorkType> {
    const workTypeAlreadyExists = await this.workTypesRepository.findByName(name)

    if(workTypeAlreadyExists) {
      throw new AppError('Work type already exists')
    }

    const workType = await this.workTypesRepository.create({ name })

    return workType
  }
}

export { CreateWorkTypeUseCase }