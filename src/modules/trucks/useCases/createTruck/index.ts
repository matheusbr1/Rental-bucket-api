import { TrucksRepository } from "../../repositories/implementations/TrucksRepository";
import { CreateTruckController } from "./CreateTruckController";
import { CreateTruckUseCase } from "./CreateTruckUseCase";

const trucksRepository = TrucksRepository.getInstance()

const createTruckUseCase = new CreateTruckUseCase(trucksRepository)

const createTruckController = new CreateTruckController(createTruckUseCase)

export { createTruckController }