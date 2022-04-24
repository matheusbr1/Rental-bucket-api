import { inject, injectable } from "tsyringe"
import { Type } from "../../infra/typeorm/entities/Type"
import { ITypesRepository } from "../../repositories/ITypesRepository"
@injectable()
class ListTypesUseCase {
  constructor(
    @inject('TypesRepository')
    private typesRepository: ITypesRepository
  ) {}

  async execute(): Promise<Type[]> {
    const truckTypes = await this.typesRepository.list()

    return truckTypes
  }
}

export { ListTypesUseCase }