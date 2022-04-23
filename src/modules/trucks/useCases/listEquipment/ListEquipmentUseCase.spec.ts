import { EquipmentsRepositoryInMemory } from "../../repositories/in-memory/EquipmentsRepositoryInMemory"
import { ListEquipmentUseCase } from "./ListEquipmentUseCase"

let equipmentsRepositoryInMemory: EquipmentsRepositoryInMemory
let listEquipmentsUseCase: ListEquipmentUseCase

describe('List truck type equipments', () => {
  beforeEach(() => {
    equipmentsRepositoryInMemory = new EquipmentsRepositoryInMemory()
    listEquipmentsUseCase = new ListEquipmentUseCase(equipmentsRepositoryInMemory)
  })

  it('should be able to list truck type equipments', async () => {
    await equipmentsRepositoryInMemory.create({
      name: 'Equipment name',
      description: 'Equipment description',
      capacity: 'Equipment capacity',
    })

    const allEquipments = await listEquipmentsUseCase.execute()

    expect(allEquipments.length).toBe(1)
  })
})