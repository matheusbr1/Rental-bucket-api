import { AppError } from "../../../../shared/errors/AppError"
import { EquipmentsRepositoryInMemory } from "../../repositories/in-memory/EquipmentsRepositoryInMemory"
import { CreateEquipmentUseCase } from "./CreateEquipmentUseCase"

let equipmentsRepositoryInMemory: EquipmentsRepositoryInMemory
let createEquipmentUseCase: CreateEquipmentUseCase

describe('Create truck type equipment', () => {
  beforeEach(() => {
    equipmentsRepositoryInMemory = new EquipmentsRepositoryInMemory()
    createEquipmentUseCase = new CreateEquipmentUseCase(equipmentsRepositoryInMemory)
  })

  it('should be able to create a equipment', async () => {
    const equipment = await createEquipmentUseCase.execute({
      name: 'equipment name',
      description: 'equipment description'
    })

    expect(equipment).toHaveProperty('id')
  })

  it('should not be able create a equipment with a existent equipment name', async () => {
    expect(async () => {
      await createEquipmentUseCase.execute({
        name: 'equipment name',
        description: 'equipment description'
      })
  
      await createEquipmentUseCase.execute({
        name: 'equipment name',
        description: 'equipment description'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})