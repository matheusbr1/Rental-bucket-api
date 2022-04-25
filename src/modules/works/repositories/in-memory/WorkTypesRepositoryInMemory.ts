import { WorkType } from "../../infra/typeorm/entities/WorkType";
import { IWorkTypesRepository } from "../IWorkTypes";

class WorkTypesRepositoryInMemory implements IWorkTypesRepository {
  private workTypes: WorkType[] = []

  async create({ name }: ICreateWorkTypeDTO): Promise<WorkType> {
    const workType = new WorkType()

    Object.assign(workType, { name })

    this.workTypes.push(workType)

    return workType
  }

  async findByName(name: string): Promise<WorkType> {
    return this.workTypes.find(workType => workType.name === name)
  }
}

export { WorkTypesRepositoryInMemory }