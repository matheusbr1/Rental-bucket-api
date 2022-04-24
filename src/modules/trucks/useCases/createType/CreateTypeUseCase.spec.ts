import { AppError } from "../../../../shared/errors/AppError"
import { TypesRepositoryInMemory } from "../../repositories/in-memory/TypesRepositoryInMemory"
import { ITypesRepository } from "../../repositories/ITypesRepository"
import { CreateTypeUseCase } from "./CreateTypeUseCase"

let typesRepositoryInMemory: ITypesRepository
let createTypeUseCase: CreateTypeUseCase

describe('Create Truck Type', () => {
  beforeEach(() => {
    typesRepositoryInMemory = new TypesRepositoryInMemory()
    createTypeUseCase = new CreateTypeUseCase(typesRepositoryInMemory)
  })

  it('should be able to create a truck type', async () => {
    const truckType = await createTypeUseCase.execute({
      name: 'Truck Type Name',
      description: 'Truck Type Description'
    })

    expect(truckType).toHaveProperty('id')
  })

  it('should not be able to create a truck type with a existent truck type name', async () => {
    expect(async () => {
      await createTypeUseCase.execute({
        name: 'Truck Type Name',
        description: 'Truck Type Description'
      })
  
      await createTypeUseCase.execute({
        name: 'Truck Type Name',
        description: 'Truck Type Description'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})