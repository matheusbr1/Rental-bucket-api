import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IDriversRepository } from "../../repositories/IDriversRepository";

@injectable()
class DriverDetailUseCase {
  constructor(
    @inject('DriversRepository')
    private driversRepository: IDriversRepository
  ) {}

  async execute(id: string) {
    const driver = await this.driversRepository.findById(id)

    if(!driver) {
      throw new AppError('Register not found', 404)
    }

    return driver
  }
}

export { DriverDetailUseCase }