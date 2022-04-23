import { ICreateTruckDTO } from "../dtos/ICreateTruckDTO";
import { Truck } from "../infra/typeorm/entities/Truck";
interface ITrucksRepository {
  create(data: ICreateTruckDTO): Promise<void>
  findByRenavam(renavam: number): Promise<Truck>
  list(): Promise<Truck[]>
}

export { ITrucksRepository }