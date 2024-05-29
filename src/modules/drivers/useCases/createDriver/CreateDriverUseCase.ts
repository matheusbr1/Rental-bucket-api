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
    const company = await this.companiesRepository.findById(data.company_id)

    if (!company) {
      throw new AppError('This company does not exist')
    }

    const { total } = await this.driversRepository.listByCompanyId({
      company_id: data.company_id,
      limit: 1,
      page: 1
    })

    if (!company.hasSubscription) {
      const MAX_DRIVERS_FREE_PLAN = 15
      if (total >= MAX_DRIVERS_FREE_PLAN) {
        const message = `To register more than ${MAX_DRIVERS_FREE_PLAN} drivers buy premium plan.`
        throw new AppError(message, 400, 'plan')
      }
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