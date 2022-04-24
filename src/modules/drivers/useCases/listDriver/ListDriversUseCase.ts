import { inject, injectable } from "tsyringe"
import { Driver } from "../../infra/typeorm/entities/Driver"
import { IDriversRepository } from "../../repositories/IDriversRepository"
@injectable()
class ListDriversUseCase {
  constructor (
    @inject('DriversRepository')
    private driversRepository: IDriversRepository
  ) {}

  async execute(): Promise<Driver[]> {
    const drivers = await this.driversRepository.list()

    return drivers
  }
}

export { ListDriversUseCase }