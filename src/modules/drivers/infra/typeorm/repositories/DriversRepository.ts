import { getRepository, Repository } from "typeorm"
import { ICreateDriverDTO } from "../../../dtos/ICreateDriverDTO"
import { IDriversRepository } from "../../../repositories/IDriversRepository"
import { Driver } from "../entities/Driver"

class DriversRepository implements IDriversRepository {
  repository: Repository<Driver>

  constructor() {
    this.repository = getRepository(Driver)
  }

  async create(data: ICreateDriverDTO): Promise<Driver> {
    const driver = await this.repository.create(data)

    await this.repository.save(driver)

    return driver
  }

  async list(): Promise<Driver[]> {
    let drivers = await this.repository.createQueryBuilder("drivers")
      .leftJoinAndSelect("drivers.contacts", "contacts")
      .leftJoinAndSelect("drivers.address", "address")
      .getMany()

    return drivers
  }

  async findByCPF(CPF: number): Promise<Driver> {
    const driver = await this.repository.findOne({ CPF })
    
    return driver
  }
}

export { DriversRepository }