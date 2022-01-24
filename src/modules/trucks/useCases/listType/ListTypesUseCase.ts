import { TypesRepository } from "../../repositories/implementations/TypesRepository";

class ListTypesUseCase {
  constructor(private typesRepository: TypesRepository) {}

  execute() {
    const types = this.typesRepository.list()

    return types
  }
}

export { ListTypesUseCase }