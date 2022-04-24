import { AppError } from "../../../../shared/errors/AppError"
import { EquipmentsRepositoryInMemory } from "../../repositories/in-memory/EquipmentsRepositoryInMemory"
import { TypesRepositoryInMemory } from "../../repositories/in-memory/TypesRepositoryInMemory"
import { CreateEquipmentUseCase } from "./CreateEquipmentUseCase"

let equipmentsRepositoryInMemory: EquipmentsRepositoryInMemory
let typesRepositoryInMemory: TypesRepositoryInMemory
let createEquipmentUseCase: CreateEquipmentUseCase

describe('Create truck type equipment', () => {
  beforeEach(() => {
    equipmentsRepositoryInMemory = new EquipmentsRepositoryInMemory()
    typesRepositoryInMemory = new TypesRepositoryInMemory()
    createEquipmentUseCase = new CreateEquipmentUseCase(
      equipmentsRepositoryInMemory,
      typesRepositoryInMemory
    )
  })

  it('should be able to create a equipment', async () => {
    const truckType = await typesRepositoryInMemory.create({
      name: 'Truck Type',
      description: 'Truck Description'
    })

    const equipment = await createEquipmentUseCase.execute({
      name: 'equipment name',
      description: 'equipment description',
      capacity: 'equipment capacity',
      truck_type_id: truckType.id
    })

    expect(equipment).toHaveProperty('id')
  })

  it('should not be able create a equipment with a existent equipment name', async () => {
    expect(async () => {
      const truckType = await typesRepositoryInMemory.create({
        name: 'Truck Type',
        description: 'Truck Description'
      })

      await createEquipmentUseCase.execute({
        name: 'equipment name',
        description: 'equipment description',
        capacity: 'equipment capacity',
        truck_type_id: truckType.id
      })
  
      await createEquipmentUseCase.execute({
        name: 'equipment name',
        description: 'equipment description',
        capacity: 'equipment capacity',
        truck_type_id: truckType.id
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a equipment with a non-existent truck type', async () => {
    expect(async () => {
      await createEquipmentUseCase.execute({
        name: 'equipment name',
        description: 'equipment description',
        capacity: 'equipment capacity',
        truck_type_id: '123'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})