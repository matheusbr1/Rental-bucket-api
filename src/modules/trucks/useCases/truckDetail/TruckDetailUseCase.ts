import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Truck } from "../../infra/typeorm/entities/Truck";
import { ITrucksRepository } from "../../repositories/ITrucksRespository";

@injectable()
class TruckDetailUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository
  ) {}

  async execute(id: string): Promise<Truck> {
    const truck = await this.trucksRepository.findById(id)

    if(!truck) {
      throw new AppError('Register not found', 404)
    }

    return truck
  }
}

export { TruckDetailUseCase }