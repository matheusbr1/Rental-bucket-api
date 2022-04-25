import { AppError } from "../../../../shared/errors/AppError"
import { WorkTypesRepositoryInMemory } from "../../repositories/in-memory/WorkTypesRepositoryInMemory"
import { CreateWorkTypeUseCase } from "./CreateWorkTypeUseCase"

let workTypesRepositoryInMemory: WorkTypesRepositoryInMemory
let createWorkTypeUseCase: CreateWorkTypeUseCase

describe('Create Work Type', () => {
  beforeEach(() => {
    workTypesRepositoryInMemory = new WorkTypesRepositoryInMemory()
    createWorkTypeUseCase = new CreateWorkTypeUseCase(workTypesRepositoryInMemory)
  })

  it('should be able to create a work type', async () => {
    const workType = await createWorkTypeUseCase.execute({ name: 'Work Type Name' })

    expect(workType).toHaveProperty('id')
  })

  it('should not be able to create a work type with a existent name', async () => {
    expect(async () => {
      await createWorkTypeUseCase.execute({ name: 'Work Type Name' })
    
      await createWorkTypeUseCase.execute({ name: 'Work Type Name' })
    }).rejects.toBeInstanceOf(AppError)
  })
})