import { ICreateDriverDTO } from "../../dtos/ICreateDriverDTO"
import { Driver } from "../../models/Driver"
import { IDriversRepository } from "../IDriversRepository"

class DriversRepository implements IDriversRepository {
  private drivers: Driver[]

  private static INSTANCE: DriversRepository

  private constructor() {
    this.drivers = []
  }

  // SINGLETON pattern
  public static getIntance(): DriversRepository {
    if(!DriversRepository.INSTANCE) {
      DriversRepository.INSTANCE = new DriversRepository()
    }

    return DriversRepository.INSTANCE
  }

  create(data: ICreateDriverDTO): void {
    const driver = new Driver()
  
    Object.assign(driver, {
      ...data,
      created_at: new Date()
    })
  
    this.drivers.push(driver)
  }

  list(): Driver[] {
    return this.drivers
  }

  findByCPF(CPF: number): Driver {
    const driver = this.drivers.find(driver => driver.CPF === CPF)
    
    return driver
  }
}

export { DriversRepository }