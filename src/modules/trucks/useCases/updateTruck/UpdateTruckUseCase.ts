import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateTruckDTO } from "../../dtos/ICreateTruckDTO";
import { Truck } from "../../infra/typeorm/entities/Truck";
import { ITrucksRepository } from "../../repositories/ITrucksRespository";

@injectable()
class UpdateTruckUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository
  ) {}

  async execute(id: string, data: ICreateTruckDTO): Promise<Truck> {
    if (!id) {
      new AppError('Missing truck id')
    }

    let truck = await this.trucksRepository.findById(id)

    if (!truck) {
      new AppError('Truck not found')
    }

    truck = {
      ...truck,
      ...data
    }

    const updatedTruck = await this.trucksRepository.create(truck)

    return updatedTruck
  }
}

export { UpdateTruckUseCase }