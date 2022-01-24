import { Truck } from "../models/Truck";

interface ICreateTruckDTO {
  brandId: number // id of brand from FIPE api
  modelId: number // id of model from FIPE api
  plate: string
  typeId: number
  renavam: number
  year: {
    manufacture: number
    model: number
  }
}

interface ITrucksRepository {
  create(data: ICreateTruckDTO): void
  findByRenavam(renavam: number): Truck
  list(): Truck[]
}

export { ITrucksRepository, ICreateTruckDTO }