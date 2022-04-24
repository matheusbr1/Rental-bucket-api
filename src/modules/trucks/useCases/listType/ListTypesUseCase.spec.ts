import { TypesRepositoryInMemory } from "../../repositories/in-memory/TypesRepositoryInMemory"
import { ListTypesUseCase } from "./ListTypesUseCase"

let typesRepositoryInMemory: TypesRepositoryInMemory
let listTypesUseCase: ListTypesUseCase

describe('List Truck Types', () => {
  beforeEach(() => {
    typesRepositoryInMemory = new TypesRepositoryInMemory()
    listTypesUseCase = new ListTypesUseCase(typesRepositoryInMemory)
  })

  it('should be able to list all truck types', async () => {
    await typesRepositoryInMemory.create({
      name: 'Truck Type Name',
      description: 'Truck Type Description',
    })

    const truckTypes = await listTypesUseCase.execute()

    expect(truckTypes.length).toBe(1)
  })
})