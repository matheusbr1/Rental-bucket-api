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

    drivers = drivers.map((driver) => {
      let updatedDriver = driver

      const address = driver.address

      if (!address.customer_id)
        delete address.customer_id
      if (!address.driver_id)
        delete address.driver_id

      const contacts = driver.contacts.map(contact => {
        const updatedContact = contact

        if (!contact.customer_id)
          delete updatedContact.customer_id
        if (!contact.driver_id)
          delete updatedContact.driver_id

        return updatedContact
      })

      updatedDriver = { ...driver, contacts, address }

      return updatedDriver
    })

    return drivers
  }

  async findByCPF(CPF: number): Promise<Driver> {
    const driver = await this.repository.findOne({ CPF })
    
    return driver
  }
}

export { DriversRepository }