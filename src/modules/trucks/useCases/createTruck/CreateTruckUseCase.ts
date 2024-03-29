import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateTruckDTO } from "../../dtos/ICreateTruckDTO"
import { Truck } from "../../infra/typeorm/entities/Truck"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"
import { ITypesRepository } from "../../repositories/ITypesRepository"
import { CompaniesRepository } from "../../../companies/infra/typeorm/repositories/CompaniesRepository"

@injectable()
class CreateTruckUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository,
    @inject('TypesRepository')
    private typesRepository: ITypesRepository,
    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository
  ) { }

  async execute(data: ICreateTruckDTO): Promise<Truck> {
    const companyExists = await this.companiesRepository.findById(data.company_id)

    if (!companyExists) {
      throw new AppError('This company does not exist')
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