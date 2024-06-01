import { getRepository, Repository } from "typeorm"
import { ICreateTruckDTO } from "../../../dtos/ICreateTruckDTO"
import { ITrucksRepository } from "../../../repositories/ITrucksRespository"
import { Truck } from "../entities/Truck"
import { IListTrucksInDTO, IListTrucksOutDTO } from "../../../dtos/IListTruckDTO"

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
    return await this.repository.createQueryBuilder("truck")
      .leftJoinAndSelect("truck.type", "type")
      .where("truck.id = :id", { id })
      .getOne()
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

  async listByCompanyId({
    company_id,
    page,
    limit
  }: IListTrucksInDTO): Promise<IListTrucksOutDTO> {
    const [trucks, total] = await this.repository.createQueryBuilder("truck")
      .leftJoinAndSelect("truck.type", "type")
      .where({ company_id })
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount()

    const pageCount = Math.ceil(total / limit)

    return { trucks, pageCount, total }
  }
}

export { TrucksRepository }