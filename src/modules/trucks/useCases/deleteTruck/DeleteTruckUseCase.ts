import { inject, injectable } from "tsyringe"
import { ITrucksRepository } from "../../repositories/ITrucksRespository"

@injectable()
class DeleteTruckUseCase {
  constructor(
    @inject('TrucksRepository')
    private trucksRepository: ITrucksRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.trucksRepository.delete(id)

    return
  }
}

export { DeleteTruckUseCase }