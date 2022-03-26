import { AppError } from "../../../../errors/AppError"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"

interface IRequest {
  brandId: number // id of brand from FIPE api
  modelId: number // id of model from FIPE api
  plate: string
  typeId: number // id of truck type
  renavam: number
  year: {
    manufacture: number
    model: number
  }
}

class CreateTruckUseCase {
  constructor(private trucksRepository: ITrucksRepository) {}

  execute(data: IRequest) {
    const truckAlreadyExists = this.trucksRepository.findByRenavam(data.renavam)

    if (truckAlreadyExists) {
      throw new AppError("Truck already exists")
    }

    this.trucksRepository.create(data)
  }
}

export { CreateTruckUseCase }