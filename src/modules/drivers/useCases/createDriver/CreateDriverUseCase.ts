import { IDriversRepository } from "../../repositories/IDriversRepository"
import { cpf } from 'cpf-cnpj-validator'
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateDriverDTO } from "../../dtos/ICreateDriverDTO"
import { inject, injectable } from "tsyringe"
import { CreateAddressUseCase } from "../../../_address/useCases/createAddress/CreateAddressUseCase"
import { CreateContactUseCase } from "../../../_contact/useCases/createContact/CreateContactUseCase"
import { MAX_FREE_PLAN } from "../../../../config/plan"
import { ICompaniesRepository } from "../../../companies/repositories/ICompaniesRepository"

@injectable()
class CreateDriverUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository,
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
    @inject('CreateAddressUseCase')
    private createAddressUseCase: CreateAddressUseCase,
    @inject('CreateContactUseCase')
    private createContactUseCase: CreateContactUseCase,
  ) { }

  async execute(data: ICreateDriverDTO) {
    const company = await this.companiesRepository.findById(data.company_id)

    if (!company) {
      throw new AppError('[driver] This company does not exist')
    }

    const { total } = await this.driversRepository.listByCompanyId({
      company_id: data.company_id,
      limit: 1,
      page: 1
    })

    if (!company.hasSubscription) {
      if (total >= MAX_FREE_PLAN.drivers) {
        const message = `To register more than ${MAX_FREE_PLAN.drivers} drivers buy premium plan.`
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

    const driver = await this.driversRepository.create(data)

    const address = await this.createAddressUseCase.execute({
      ...data.address,
      driver_id: driver.id
    })

    const contactPromises = data.contacts.map(async contact => {
      return await this.createContactUseCase.execute({
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