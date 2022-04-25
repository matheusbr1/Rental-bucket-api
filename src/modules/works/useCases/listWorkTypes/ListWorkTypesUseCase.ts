import { inject, injectable } from "tsyringe"
import { WorkType } from "../../infra/typeorm/entities/WorkType"
import { IWorkTypesRepository } from "../../repositories/IWorkTypesRepository"

@injectable()
class ListWorkTypesUseCase {
  constructor(
    @inject('WorkTypesRepository')
    private workTypesRepository: IWorkTypesRepository
  ) {}

  async execute(): Promise<WorkType[]> {
    const workTypes = await this.workTypesRepository.list()

    return workTypes
  }
}

export { ListWorkTypesUseCase }