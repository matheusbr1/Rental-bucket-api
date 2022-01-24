import { DriversRepository } from "../../repositories/implementations/DriversRepository";

class ListDriversUseCase {
  constructor (private driversRepository: DriversRepository) {}

  execute() {
    const drivers = this.driversRepository.list()

    return drivers
  }
}

export { ListDriversUseCase }