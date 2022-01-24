import { TypesRepository } from "../../repositories/implementations/TypesRepository";
import { ListTypesController } from "./ListTypesController";
import { ListTypesUseCase } from "./ListTypesUseCase";

const typesRepository = TypesRepository.getInstance()

const listTypesUseCase = new ListTypesUseCase(typesRepository)

const listTypesController = new ListTypesController(listTypesUseCase)

export { listTypesController }