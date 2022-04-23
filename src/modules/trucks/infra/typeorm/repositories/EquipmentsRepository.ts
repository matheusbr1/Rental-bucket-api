import { getRepository, Repository } from "typeorm";
import { ICreateEquipmentDTO } from "../../../dtos/ICreateEquipmentDTO";
import { IEquipmentsRepository } from "../../../repositories/IEquipmentsRepository";
import { Equipment } from "../entities/Equipment";

class EquipmentsRepository implements IEquipmentsRepository {
  repository: Repository<Equipment>

  constructor() {
    this.repository = getRepository(Equipment)
  }

  async create({ name, description, capacity }: ICreateEquipmentDTO): Promise<Equipment> {
      const equipment = this.repository.create({
        name, 
        description,
        capacity
      })

      await this.repository.save(equipment)

      return equipment
  }

  async findByName(name: string): Promise<Equipment> {
    const equipment = await this.repository.findOne({ name })

    return equipment
  }
}

export { EquipmentsRepository }