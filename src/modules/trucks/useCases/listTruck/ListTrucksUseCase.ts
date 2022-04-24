import { ITrucksRepository } from "../../repositories/ITrucksRespository"

class ListTrucksUseCase {
  constructor(private trucksRepository: ITrucksRepository) {}

  execute() {
    return this.trucksRepository.list()
  }
}

export { ListTrucksUseCase }