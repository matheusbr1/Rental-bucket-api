import { ICreateTruckDTO } from "../dtos/ICreateTruckDTO";
import { Truck } from "../infra/typeorm/entities/Truck";
interface ITrucksRepository {
  create(data: ICreateTruckDTO): Promise<Truck>
  findByRenavam(renavam: number): Promise<Truck>
  findByPlate(plate: string): Promise<Truck>
  findById(id: string): Promise<Truck>
  list(): Promise<Truck[]>
}

export { ITrucksRepository }