import { ICreateDriverDTO } from "../../dtos/ICreateDriverDTO";
import { IListDriversInDTO, IListDriversOutDTO } from "../../dtos/IListDriversDTO";
import { Driver } from "../../infra/typeorm/entities/Driver";
import { IDriversRepository } from "../IDriversRepository";

class DriversRepositoryInMemory implements IDriversRepository {
  private drivers: Driver[] = []

  async create(data: ICreateDriverDTO): Promise<Driver> {
    const driver = new Driver()

    Object.assign(driver, data)

    this.drivers.push(driver)

    return driver
  }

  async list(): Promise<Driver[]> {
    return this.drivers
  }

  async findByCPF(CPF: number): Promise<Driver> {
    return this.drivers.find(driver => driver.CPF === CPF)
  }

  async listByCompanyId(data: IListDriversInDTO): Promise<IListDriversOutDTO> {
    const drivers = this.drivers.filter(driver => driver.company_id === data.company_id)
    return {
      drivers,
      pageCount: 0,
      total: drivers.length
    }
  }

  async findById(id: string): Promise<Driver> {
    return this.drivers.find(driver => driver.id === id)
  }

  async delete(id: string): Promise<void> {
    this.drivers = this.drivers.filter(driver => driver.id !== id)
  }
}

export { DriversRepositoryInMemory }