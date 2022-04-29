import { ICreateDriverDTO } from "../../dtos/ICreateDriverDTO";
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

  findById(id: string): Promise<Driver> {
    throw new Error("Method not implemented.");
  }
  
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export { DriversRepositoryInMemory }