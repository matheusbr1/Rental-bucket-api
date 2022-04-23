import { ICreateTruckDTO } from "../../../dtos/ICreateTruckDTO"
import { ITrucksRepository } from "../../../repositories/ITrucksRespository"
import { Truck } from "../entities/Truck"

class TrucksRepository implements ITrucksRepository {
  private trucks: Truck[]

  private static INSTANCE: TrucksRepository

  private constructor() {
    this.trucks = []
  }

  public static getInstance(): TrucksRepository {
    if (!TrucksRepository.INSTANCE) {
      TrucksRepository.INSTANCE = new TrucksRepository()
    }

    return TrucksRepository.INSTANCE
  }

  async create(data: ICreateTruckDTO): Promise<void> {
    const truck = new Truck()

    Object.assign(truck, {
      ...data,
      created_at: new Date()
    })

    this.trucks.push(truck)
  }

  async findByRenavam(renavam: number): Promise<Truck> {
    const truck = this.trucks.find(truck => truck.renavam === renavam)

    return truck
  }

  async list(): Promise<Truck[]> {
    return this.trucks
  }
}

export { TrucksRepository }