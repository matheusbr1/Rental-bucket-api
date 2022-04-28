import { inject, injectable } from "tsyringe";
import { IDriversRepository } from "../../repositories/IDriversRepository";

@injectable()
class DeleteDriverUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.driversRepository.delete(id)

    return 
  }
}

export { DeleteDriverUseCase }