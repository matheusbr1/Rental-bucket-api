import { DriversRepository } from "../../infra/typeorm/repositories/DriversRepository";
import { ListDriversController } from "./ListDriversController";
import { ListDriversUseCase } from "./ListDriversUseCase";

const driversRepository = DriversRepository.getIntance()

const listDriversUseCase = new ListDriversUseCase(driversRepository)

const listDriversController = new ListDriversController(listDriversUseCase)

export { listDriversController }