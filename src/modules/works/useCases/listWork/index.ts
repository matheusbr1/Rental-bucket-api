import { WorksRepository } from "../../infra/repositories/WorksRepository";
import { ListWorkController } from "./listWorkController";
import { ListWorkUseCase } from "./listWorkUseCase";

const worksRepository = WorksRepository.getIntance()

const listWorkUseCase = new ListWorkUseCase(worksRepository)

const listWorkController = new ListWorkController(listWorkUseCase)

export { listWorkController }