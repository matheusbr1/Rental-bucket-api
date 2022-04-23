import { ICreateEquipmentDTO } from "../../dtos/ICreateEquipmentDTO";
import { Equipment } from "../../infra/typeorm/entities/Equipment";
import { IEquipmentsRepository } from "../IEquipmentsRepository";

class EquipmentsRepositoryInMemory implements IEquipmentsRepository {
  equipments: Equipment[] = []

  async create({ name, description, capacity }: ICreateEquipmentDTO): Promise<Equipment> {
    const equipment = new Equipment()

    Object.assign(equipment, {
      name, 
      description,
      capacity
    })

    this.equipments.push(equipment)

    return equipment
  }

  async findByName(name: string): Promise<Equipment> {
    const equipment = this.equipments.find(equipment => equipment.name === name)
    
    return equipment
  }
}

export { EquipmentsRepositoryInMemory }