import { TrucksRepository } from "../../infra/typeorm/repositories/TrucksRepository";
import { ListTrucksController } from "./ListTrucksController";
import { ListTrucksUseCase } from "./ListTrucksUseCase";

const trucksRepository = TrucksRepository.getInstance()

const listTrucksUseCase = new ListTrucksUseCase(trucksRepository)

const listTruksController = new ListTrucksController(listTrucksUseCase)

export { listTruksController }