import { DriversRepository } from "../../infra/typeorm/repositories/DriversRepository";
import { CreateDriverController } from "./CreateDriverController";
import { CreateDriverUseCase } from "./CreateDriverUseCase";

const driversRepository = DriversRepository.getIntance()

const createDriverUseCase = new CreateDriverUseCase(driversRepository)

const createDriverController = new CreateDriverController(createDriverUseCase)

export { createDriverController }