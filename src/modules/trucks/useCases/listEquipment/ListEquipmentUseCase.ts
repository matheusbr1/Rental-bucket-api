import { inject, injectable } from "tsyringe";
import { Equipment } from "../../infra/typeorm/entities/Equipment";
import { IEquipmentsRepository } from "../../repositories/IEquipmentsRepository";

@injectable()
class ListEquipmentUseCase {
  constructor(
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository
  ) {}

  async execute(): Promise<Equipment[]> {
    const allEquipments = await this.equipmentsRepository.list()

    return allEquipments
  }
}

export { ListEquipmentUseCase }