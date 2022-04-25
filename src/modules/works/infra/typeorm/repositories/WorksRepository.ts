import { getRepository, Repository } from "typeorm"
import { ICreateWorkDTO } from "../../../dtos/ICreateWorkDTO"
import { IWorksRepository } from "../../../repositories/IWorksRepository"
import { Work } from "../entities/Work"

class WorksRepository implements IWorksRepository {
  repository: Repository<Work>

  constructor () {
    this.repository = getRepository(Work)
  }

  async create(data: ICreateWorkDTO): Promise<Work> {
    const work = this.repository.create(data)

    await this.repository.save(work)

    return work
  }

  async list(): Promise<Work[]> {
  const works = await this.repository.createQueryBuilder("works")
      .leftJoinAndSelect("works.customer", "customer")
      .leftJoinAndSelect("works.driver", "driver")
      .leftJoinAndSelect("works.address", "address")
      .leftJoinAndSelect("works.truck", "truck")
      .leftJoinAndSelect("works.work_type", "work_type")
      .leftJoinAndSelect("works.equipment", "equipment")
      .getMany()

  return works
  }
}

export { WorksRepository }