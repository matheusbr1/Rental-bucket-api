import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateTypeDTO } from "../../dtos/ICreateTypeDTO";
import { Type } from "../../infra/typeorm/entities/Type";
import { ITypesRepository } from "../../repositories/ITypesRepository";

@injectable()
class CreateTypeUseCase {
  constructor(
    @inject('TypesRepository')
    private typesRepository: ITypesRepository
  ) {}

  async execute({ name, description }: ICreateTypeDTO): Promise<Type> {
    const typeAlreadyExists = await this.typesRepository.findByName(name)

    if (typeAlreadyExists) {
      throw new AppError("Type already exists")
    }

    const truckType = await this.typesRepository.create({ name, description })

    return truckType
  } 
}

export { CreateTypeUseCase }