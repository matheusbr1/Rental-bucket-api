import { ICreateEquipmentDTO } from "../dtos/ICreateEquipmentDTO"
import { Equipment } from "../infra/typeorm/entities/Equipment"

interface IEquipmentsRepository {
  create(data: ICreateEquipmentDTO): Promise<Equipment>
  findByName(name: string): Promise<Equipment>
  list(): Promise<Equipment[]>
}

export { IEquipmentsRepository }