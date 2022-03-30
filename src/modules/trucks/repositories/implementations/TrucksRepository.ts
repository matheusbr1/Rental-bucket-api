import { ICreateTruckDTO } from '../../dtos/ICreateTruckDTO'
import { Truck } from '../../entities/Truck'
import { ITrucksRepository } from '../ITrucksRespository'

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

  create(data: ICreateTruckDTO): void {
    const truck = new Truck()

    Object.assign(truck, {
      ...data,
      created_at: new Date()
    })

    this.trucks.push(truck)
  }

  findByRenavam(renavam: number): Truck {
    const truck = this.trucks.find(truck => truck.renavam === renavam)

    return truck
  }

  list(): Truck[] {
    return this.trucks
  }
}

export { TrucksRepository }