import { ICreateEquipmentDTO } from "../dtos/ICreateEquipmentDTO"
import { Equipment } from "../infra/typeorm/entities/Equipment"

interface IEquipmentsRepository {
  create(data: ICreateEquipmentDTO): Promise<Equipment>
  findByName(name: string): Promise<Equipment>
}

export { IEquipmentsRepository }