import { getRepository, Repository } from "typeorm";
import { ICreateEquipmentDTO } from "../../../dtos/ICreateEquipmentDTO";
import { IEquipmentsRepository } from "../../../repositories/IEquipmentsRepository";
import { Equipment } from "../entities/Equipment";

class EquipmentsRepository implements IEquipmentsRepository {
  repository: Repository<Equipment>

  constructor() {
    this.repository = getRepository(Equipment)
  }

  async create({ 
    name, 
    description, 
    capacity,
    truck_type_id
  }: ICreateEquipmentDTO): Promise<Equipment> {
      const equipment = this.repository.create({
        name, 
        description,
        capacity,
        truck_type_id
      })

      await this.repository.save(equipment)

      return equipment
  }

  async findByName(name: string): Promise<Equipment> {
    const equipment = await this.repository.findOne({ name })

    return equipment
  }

  async list(): Promise<Equipment[]> {
    const allEquipments = await this.repository.find()

    return allEquipments
  }
}

export { EquipmentsRepository }