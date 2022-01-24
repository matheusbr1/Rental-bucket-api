import { TypesRepository } from "../../repositories/implementations/TypesRepository";
import { CreateTypeController } from "./CreateTypeController";
import { CreateTypeUseCase } from "./CreateTypeUseCase";

const typesRepository = TypesRepository.getInstance()

const createTypeUseCase = new CreateTypeUseCase(typesRepository)

const createTypeController = new CreateTypeController(createTypeUseCase)

export { createTypeController }