import { IDriversRepository } from "../../repositories/IDriversRepository"
import { cpf } from 'cpf-cnpj-validator'
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateDriverDTO } from "../../dtos/ICreateDriverDTO"
import { container, inject, injectable } from "tsyringe"
import { CompaniesRepository } from "../../../companies/infra/typeorm/repositories/CompaniesRepository"
import { CreateAddressUseCase } from "../../../_address/useCases/createAddress/CreateAddressUseCase"
import { CreateContactUseCase } from "../../../_contact/useCases/createContact/CreateContactUseCase"


@injectable()
class CreateDriverUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,

    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository,
  ) { }

  async execute(data: ICreateDriverDTO) {
    const companyExists = await this.companiesRepository.findById(data.company_id)

    if (!companyExists) {
      throw new AppError('This company does not exist')
    }

    const driverAlredyExists = await this.driversRepository.findByCPF(data.CPF)

    if (driverAlredyExists) {
      throw new AppError('This driver already exists')
    }

    const isCPFValid = cpf.isValid(String(data.CPF))

    if (!isCPFValid) {
      throw new AppError('This CPF is invalid')
    }

    const createAddressUseCase = container.resolve(CreateAddressUseCase)
    const createContactUseCase = container.resolve(CreateContactUseCase)

    const driver = await this.driversRepository.create(data)

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

    return {
      ...driver,
      address,
      contacts
    }
  }
}

export { CreateDriverUseCase }