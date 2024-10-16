import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateTruckDTO } from "../../dtos/ICreateTruckDTO"
import { Truck } from "../../infra/typeorm/entities/Truck"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"
import { ITypesRepository } from "../../repositories/ITypesRepository"
import { MAX_FREE_PLAN } from "../../../../config/plan"
import { ICompaniesRepository } from "../../../companies/repositories/ICompaniesRepository"

@injectable()
class CreateTruckUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository,
    @inject('TypesRepository')
    private typesRepository: ITypesRepository,
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository
  ) { }

  async execute(data: ICreateTruckDTO): Promise<Truck> {
    const company = await this.companiesRepository.findById(data.company_id)

    if (!company) {
      throw new AppError('[truck] This company does not exist')
    }

    const { total } = await this.trucksRepository.listByCompanyId({
      company_id: data.company_id,
      limit: 1,
      page: 1
    })

    if (!company.hasSubscription) {
      if (total >= MAX_FREE_PLAN.trucks) {
        const message = `To register more than ${MAX_FREE_PLAN.trucks} trucks buy premium plan.`
        throw new AppError(message, 400, 'plan')
      }
    }

    const truckAlreadyExistsRenavam = await this.trucksRepository.findByRenavam(data.renavam)

    if (truckAlreadyExistsRenavam) {
      throw new AppError("Truck with this renavam already exists")
    }

    const truckAlreadyExistsPlate = await this.trucksRepository.findByPlate(data.plate)

    if (truckAlreadyExistsPlate) {
      throw new AppError("Truck with this plate already exists")
    }

    const truckTypeExists = await this.typesRepository.findById(data.truck_type_id)

    if (!truckTypeExists) {
      throw new AppError('Truck Type does not exists')
    }

    const truck = await this.trucksRepository.create(data)

    return truck
  }
}

export { CreateTruckUseCase }