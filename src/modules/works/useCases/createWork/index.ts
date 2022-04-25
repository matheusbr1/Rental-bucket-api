import { WorksRepository } from "../../infra/typeorm/repositories/WorksRepository";
import { CreateWorkController } from "./CreateWorkController";
import { CreateWorkUseCase } from "./CreateWorkUseCase";

const createWorkRepository = WorksRepository.getIntance()

const createWorkUseCase = new CreateWorkUseCase(createWorkRepository)

const createWorkController = new CreateWorkController(createWorkUseCase)

export { createWorkController }