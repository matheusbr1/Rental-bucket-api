import { ICreateTruckDTO } from "../../dtos/ICreateTruckDTO";
import { Truck } from "../../infra/typeorm/entities/Truck";
import { ITrucksRepository } from "../ITrucksRespository";

class TrucksRepositoryInMemory implements ITrucksRepository {
  private trucks: Truck[] = []

  async create(data: ICreateTruckDTO): Promise<Truck> {
    const truck = new Truck()

    Object.assign(truck, data)

    this.trucks.push(truck)

    return truck
  }

  async findByRenavam(renavam: number): Promise<Truck> {
    return this.trucks.find(truck => truck.renavam === renavam)
  }

  async findByPlate(plate: string): Promise<Truck> {
    return this.trucks.find(truck => truck.plate === plate)
  }

  async list(): Promise<Truck[]> {
    return this.trucks
  }
}

export { TrucksRepositoryInMemory }