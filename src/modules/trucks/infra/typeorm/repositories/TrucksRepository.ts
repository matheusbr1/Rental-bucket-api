import { getRepository, Repository } from "typeorm"
import { ICreateTruckDTO } from "../../../dtos/ICreateTruckDTO"
import { ITrucksRepository } from "../../../repositories/ITrucksRespository"
import { Truck } from "../entities/Truck"

class TrucksRepository implements ITrucksRepository {
  repository: Repository<Truck>

  constructor() {
    this.repository = getRepository(Truck)
  }

  async create(data: ICreateTruckDTO): Promise<Truck> {
    const truck = this.repository.create(data)

    await this.repository.save(truck)

    return truck
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById(id: string): Promise<Truck> {
    return await this.repository.findOne(id)
  }

  async findByRenavam(renavam: number): Promise<Truck> {
    return await this.repository.findOne({ renavam })
  }

  async findByPlate(plate: string): Promise<Truck> {
    return await this.repository.findOne({ plate })
  }

  async list(): Promise<Truck[]> {
    return await this.repository.createQueryBuilder("truck")
    .leftJoinAndSelect("truck.type", "type")
    .getMany()
  }
}

export { TrucksRepository }