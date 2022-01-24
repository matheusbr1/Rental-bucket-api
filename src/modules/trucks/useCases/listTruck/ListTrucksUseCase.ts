import { TrucksRepository } from "../../repositories/implementations/TrucksRepository";

class ListTrucksUseCase {
  constructor(private trucksRepository: TrucksRepository) {}

  execute() {
    return this.trucksRepository.list()
  }
}

export { ListTrucksUseCase }