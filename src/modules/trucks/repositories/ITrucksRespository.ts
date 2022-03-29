import { ICreateTruckDTO } from "../dtos/ICreateTruckDTO";
import { Truck } from "../models/Truck";
interface ITrucksRepository {
  create(data: ICreateTruckDTO): void
  findByRenavam(renavam: number): Truck
  list(): Truck[]
}

export { ITrucksRepository }