import { ICreateWorkDTO } from "../../dtos/ICreateWorkDTO";
import { Work } from "../../infra/typeorm/entities/Work";
import { IWorksRepository } from "../IWorksRepository";

class WorksRepositoryInMemory implements IWorksRepository {
  private works: Work[] = []

  async create(data: ICreateWorkDTO): Promise<Work> {
    const work = new Work()

    Object.assign(work, data)

    return work
  }

  async list(): Promise<Work[]> {
    return this.works
  }

  findById(id: string): Promise<Work> {
    throw new Error("Method not implemented.");
  }
  
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { WorksRepositoryInMemory }