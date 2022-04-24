import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateTruckDTO } from "../../dtos/ICreateTruckDTO"
import { Truck } from "../../infra/typeorm/entities/Truck"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"
import { ITypesRepository } from "../../repositories/ITypesRepository"

@injectable()
class CreateTruckUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository,
    @inject('TypesRepository')
    private typesRepository: ITypesRepository
  ) {}

  async execute(data: ICreateTruckDTO): Promise<Truck> {
    const truckAlreadyExistsRenavam = await this.trucksRepository.findByRenavam(data.renavam)
    const truckAlreadyExistsPlate = await this.trucksRepository.findByPlate(data.plate)

    if (truckAlreadyExistsRenavam) {
      throw new AppError("Truck with this renavam already exists")
    }

    if (truckAlreadyExistsPlate) {
      throw new AppError("Truck with this plate already exists")
    }

    const truckTypeExists = await this.typesRepository.findById(data.truck_type_id)

    if(!truckTypeExists) {
      throw new AppError('Truck Type does not exists')
    }

    const truck = await this.trucksRepository.create(data)

    return truck
  }
}

export { CreateTruckUseCase }