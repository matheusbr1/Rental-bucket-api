import { AppError } from "../../../../errors/AppError";
import { ITypesRepository } from "../../repositories/ITypesRepository";

interface IRequest {
  name: string
}

class CreateTypeUseCase {
  constructor(private typesRepository: ITypesRepository) {}

  execute({ name }: IRequest) {
    const typeAlreadyExists = this.typesRepository.findByName(name)

    if (typeAlreadyExists) {
      throw new AppError("Type already exists")
    }

    this.typesRepository.create({ name })
  } 
}

export { CreateTypeUseCase }