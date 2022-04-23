import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateEquipmentDTO } from "../../dtos/ICreateEquipmentDTO";
import { Equipment } from "../../infra/typeorm/entities/Equipment";
import { IEquipmentsRepository } from "../../repositories/IEquipmentsRepository";

@injectable()
class CreateEquipmentUseCase {
  constructor(
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository
  ) {}

  async execute({ name, description, capacity }: ICreateEquipmentDTO): Promise<Equipment> {
    const equipmentAlreadyExists = await this.equipmentsRepository.findByName(name)

    if(equipmentAlreadyExists) {
      throw new AppError('Equipment already exists')
    }

    const equipment = await this.equipmentsRepository.create({ name, description, capacity })

    return equipment
  }
}

export { CreateEquipmentUseCase }