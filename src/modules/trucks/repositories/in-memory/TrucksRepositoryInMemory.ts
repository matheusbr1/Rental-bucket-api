import { ICreateTruckDTO } from "../../dtos/ICreateTruckDTO";
import { IListTrucksInDTO, IListTrucksOutDTO } from "../../dtos/IListTruckDTO";
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

  async listByCompanyId(data: IListTrucksInDTO): Promise<IListTrucksOutDTO> {
    const trucks = this.trucks.filter(truck => truck.company_id === data.company_id)
    return {
      trucks,
      pageCount: 10,
      total: trucks.length
    }
  }

  async findById(id: string): Promise<Truck> {
    return this.trucks.find(truck => truck.id === id)
  }

  async delete(id: string): Promise<void> {
    this.trucks = this.trucks.filter(truck => truck.id !== id)
  }
}

export { TrucksRepositoryInMemory }