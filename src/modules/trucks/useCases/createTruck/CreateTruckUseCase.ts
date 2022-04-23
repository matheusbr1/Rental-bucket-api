import { AppError } from "../../../../shared/errors/AppError"
import { ICreateTruckDTO } from "../../dtos/ICreateTruckDTO"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"
class CreateTruckUseCase {
  constructor(private trucksRepository: ITrucksRepository) {}

  async execute(data: ICreateTruckDTO): Promise<void> {
    const truckAlreadyExists = this.trucksRepository.findByRenavam(data.renavam)

    if (truckAlreadyExists) {
      throw new AppError("Truck already exists")
    }

    this.trucksRepository.create(data)
  }
}

export { CreateTruckUseCase }