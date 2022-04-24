import { DriversRepositoryInMemory } from "../../repositories/in-memory/DriversRepositoryInMemory"
import { CreateDriverUseCase } from "./CreateDriverUseCase"

let driversRepositoryInMemory: DriversRepositoryInMemory
let createDriverUseCase: CreateDriverUseCase

describe('Create Driver', () => {
  beforeEach(() => {
    driversRepositoryInMemory = new DriversRepositoryInMemory()
    createDriverUseCase = new CreateDriverUseCase(driversRepositoryInMemory)
  })

  it('should be able to create driver', async () => {
    const driver = await createDriverUseCase.execute({
      name: 'Jhon Doe',
      CPF: 99005261552,
      CNH: 1234564,
      RG: '228652662',
      birthday: '01/03/1974',
    })

    expect(driver).toHaveProperty('id')
  })
})