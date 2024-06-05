import { getRepository, Repository } from "typeorm"
import { ICreateWorkDTO } from "../../../dtos/ICreateWorkDTO"
import { IWorksRepository } from "../../../repositories/IWorksRepository"
import { Work } from "../entities/Work"
import { IListWorksInDTO, IListWorksOutDTO } from "../../../dtos/IListWorksDTO"

class WorksRepository implements IWorksRepository {
  repository: Repository<Work>

  constructor() {
    this.repository = getRepository(Work)
  }

  async create(data: ICreateWorkDTO): Promise<Work> {
    const work = this.repository.create(data)

    await this.repository.save(work)

    return work
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById(id: string): Promise<Work> {
    const work = await this.repository.createQueryBuilder("work")
      .leftJoinAndSelect("work.customer", "customer")
      .leftJoinAndSelect("work.driver", "driver")
      .leftJoinAndSelect("work.address", "address")
      .leftJoinAndSelect("work.truck", "truck")
      .leftJoinAndSelect("work.work_type", "work_type")
      .leftJoinAndSelect("work.equipment", "equipment")
      .where({ id })
      .getOne()

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

  async listByCompanyId({
    company_id,
    page,
    limit,
    status
  }: IListWorksInDTO): Promise<IListWorksOutDTO> {
    const query = this.repository.createQueryBuilder("works")
      .leftJoinAndSelect("works.customer", "customer")
      .leftJoinAndSelect("works.driver", "driver")
      .leftJoinAndSelect("works.address", "address")
      .leftJoinAndSelect("works.truck", "truck")
      .leftJoinAndSelect("works.work_type", "work_type")
      .leftJoinAndSelect("works.equipment", "equipment")
      .where({ company_id })

    if (status !== 'all') {
      query.andWhere("works.is_done = :is_done", { is_done: status === 'done' });
    }

    const [works, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const pageCount = Math.ceil(total / limit)

    return { total, pageCount, works }
  }
}

export { WorksRepository }