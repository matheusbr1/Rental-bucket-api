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
    return await this.repository.find()
  }

  async findByCPF(CPF: number): Promise<Driver> {
    const driver = await this.repository.findOne({ CPF })
    
    return driver
  }
}

export { DriversRepository }