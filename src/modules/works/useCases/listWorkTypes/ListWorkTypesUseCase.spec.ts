import { WorkTypesRepositoryInMemory } from "../../repositories/in-memory/WorkTypesRepositoryInMemory"
import { ListWorkTypesUseCase } from "./ListWorkTypesUseCase"

let workTypesRepositoryInMemory: WorkTypesRepositoryInMemory
let listWorkTypesUseCase: ListWorkTypesUseCase

describe('List Work Type', () => {
  beforeEach(() => {
    workTypesRepositoryInMemory = new WorkTypesRepositoryInMemory()
    listWorkTypesUseCase = new ListWorkTypesUseCase(workTypesRepositoryInMemory)
  })

  it('should be able to list all work types', async () => {
    await workTypesRepositoryInMemory.create({ name: 'Work Type' })

    const workTypes = await listWorkTypesUseCase.execute()

    expect(workTypes.length).toBe(1)
  })
})