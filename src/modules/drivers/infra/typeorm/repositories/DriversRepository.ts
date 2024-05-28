import { getRepository, Repository } from "typeorm"
import { ICreateDriverDTO } from "../../../dtos/ICreateDriverDTO"
import { IDriversRepository } from "../../../repositories/IDriversRepository"
import { Driver } from "../entities/Driver"
import { IListDriversInDTO, IListDriversOutDTO } from "../../../dtos/IListDriversDTO"

class DriversRepository implements IDriversRepository {
  repository: Repository<Driver>

  constructor() {
    this.repository = getRepository(Driver)
  }

  async create(data: ICreateDriverDTO): Promise<Driver> {
    const driver = this.repository.create(data)

    await this.repository.save(driver)

    return driver
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById(id: string): Promise<Driver> {
    const driver = await this.repository.createQueryBuilder('driver')
      .leftJoinAndSelect("driver.contacts", "contacts")
      .leftJoinAndSelect("driver.address", "address")
      .where({ id })
      .getOne()

    return driver
  }

  async findByCPF(CPF: number): Promise<Driver> {
    const driver = await this.repository.findOne({ CPF })

    return driver
  }

  async list(): Promise<Driver[]> {
    let drivers = await this.repository.createQueryBuilder("drivers")
      .leftJoinAndSelect("drivers.contacts", "contacts")
      .leftJoinAndSelect("drivers.address", "address")
      .getMany()

    return drivers
  }

  async listByCompanyId({
    company_id,
    page,
    limit
  }: IListDriversInDTO): Promise<IListDriversOutDTO> {
    const [drivers, total] = await this.repository.createQueryBuilder('driver')
      .leftJoinAndSelect("driver.contacts", "contacts")
      .leftJoinAndSelect("driver.address", "address")
      .where({ company_id })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    const pageCount = Math.ceil(total / limit)

    return { drivers, pageCount, total }
  }
}

export { DriversRepository }