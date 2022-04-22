import { TypesRepository } from "../../infra/repositories/TypesRepository";
import { CreateTypeController } from "./CreateTypeController";
import { CreateTypeUseCase } from "./CreateTypeUseCase";

const typesRepository = TypesRepository.getInstance()

const createTypeUseCase = new CreateTypeUseCase(typesRepository)

const createTypeController = new CreateTypeController(createTypeUseCase)

export { createTypeController }