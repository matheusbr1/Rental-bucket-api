import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateEquipmentDTO } from "../../dtos/ICreateEquipmentDTO";
import { Equipment } from "../../infra/typeorm/entities/Equipment";
import { IEquipmentsRepository } from "../../repositories/IEquipmentsRepository";
import { ITypesRepository } from "../../repositories/ITypesRepository";

@injectable()
class CreateEquipmentUseCase {
  constructor(
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository,
    @inject('TypesRepository')
    private typesRepository: ITypesRepository
  ) {}

  async execute({ 
    name, 
    description, 
    capacity, 
    truck_type_id 
  }: ICreateEquipmentDTO): Promise<Equipment> {
    const equipmentAlreadyExists = await this.equipmentsRepository.findByName(name)

    if(equipmentAlreadyExists) {
      throw new AppError('Equipment already exists')
    }

    const truckTypeExists = await this.typesRepository.findById(truck_type_id)

    if(!truckTypeExists) {
      throw new AppError('Truck Type does not exists')
    }

    const equipment = await this.equipmentsRepository.create({ 
      name, 
      description, 
      capacity, 
      truck_type_id 
    })

    return equipment
  }
}

export { CreateEquipmentUseCase }