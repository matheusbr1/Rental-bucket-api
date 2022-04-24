import { DriversRepositoryInMemory } from "../../repositories/in-memory/DriversRepositoryInMemory"
import { ListDriversUseCase } from "./ListDriversUseCase"

let driversRepositoryInMemory: DriversRepositoryInMemory
let listDriversUseCase: ListDriversUseCase

describe('List Driver', () => {
  beforeEach(() => {
    driversRepositoryInMemory = new DriversRepositoryInMemory()
    listDriversUseCase = new ListDriversUseCase(driversRepositoryInMemory)
  })

  it('should be able to list all drivers', async () => {
    await driversRepositoryInMemory.create({
      name: 'Jhon Doe',
      CPF: 99005261552,
      CNH: 1234564,
      RG: '228652662',
      birthday: '01/03/1974',
    })

    const drivers = await listDriversUseCase.execute()

    expect(drivers.length).toBe(1)
  })
})