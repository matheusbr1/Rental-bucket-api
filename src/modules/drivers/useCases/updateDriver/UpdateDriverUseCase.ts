import { container, inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateDriverDTO } from "../../dtos/ICreateDriverDTO";
import { Driver } from "../../infra/typeorm/entities/Driver";
import { IDriversRepository } from "../../repositories/IDriversRepository";
import * as validator from 'cpf-cnpj-validator'
import { CreateAddressUseCase } from "../../../_address/useCases/createAddress/CreateAddressUseCase";
import { CreateContactUseCase } from "../../../_contact/useCases/createContact/CreateContactUseCase";

@injectable()
class UpdateDriverUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository
  ) { }

  async execute(id: string, data: ICreateDriverDTO): Promise<Driver> {
    let driver = await this.driversRepository.findById(id)

    if (!driver) {
      throw new AppError("Driver does not exists")
    }

    if (data?.CPF) {
      const isCPFValid = validator.cpf.isValid(String(data.CPF))
      if (!isCPFValid) {
        throw new AppError('This CPF is invalid')
      }
    }

    const createAddressUseCase = container.resolve(CreateAddressUseCase)
    const createContactUseCase = container.resolve(CreateContactUseCase)

    const address = await createAddressUseCase.execute({
      ...data.address,
      driver_id: driver.id
    })

    const contactPromises = data.contacts.map(async contact => {
      return await createContactUseCase.execute({
        ...contact,
        driver_id: driver.id
      })
    })

    const contacts = await Promise.all(contactPromises)

    driver = {
      ...driver,
      ...data,
      address,
      contacts
    }

    const updatedDriver = await this.driversRepository.create(driver)

    return updatedDriver
  }
}

export { UpdateDriverUseCase }