import { inject, injectable } from "tsyringe"
import { Truck } from "../../infra/typeorm/entities/Truck"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"

@injectable()
class ListTrucksUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository
  ) {}

  async execute(): Promise<Truck[]> {
    return await this.trucksRepository.list()
  }
}

export { ListTrucksUseCase }