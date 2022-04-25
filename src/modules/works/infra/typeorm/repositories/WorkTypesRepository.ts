import { getRepository, Repository } from "typeorm";
import { IWorkTypesRepository } from "../../../repositories/IWorkTypesRepository";
import { WorkType } from "../entities/WorkType";

class WorkTypesRepository implements IWorkTypesRepository {
  repository: Repository<WorkType>

  constructor() {
    this.repository = getRepository(WorkType)
  }

  async create({ name }: ICreateWorkTypeDTO): Promise<WorkType> {
    const workType = this.repository.create({ name })  

    await this.repository.save(workType)

    return workType
  }
  
  async findByName(name: string): Promise<WorkType> {
    return await this.repository.findOne({ name })
  }

  async list(): Promise<WorkType[]> {
    return await this.repository.find()
  }

}

export { WorkTypesRepository }