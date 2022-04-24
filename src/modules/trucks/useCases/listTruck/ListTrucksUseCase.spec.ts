import { TrucksRepositoryInMemory } from "../../repositories/in-memory/TrucksRepositoryInMemory"
import { ListTrucksUseCase } from "./ListTrucksUseCase"

let trucksRepositoryInMemory: TrucksRepositoryInMemory
let listTrucksUseCase: ListTrucksUseCase

describe('List Trucks', () => {
  beforeEach(() => {
    trucksRepositoryInMemory = new TrucksRepositoryInMemory()
    listTrucksUseCase = new ListTrucksUseCase(trucksRepositoryInMemory)
  })
  
  it('should be able to list all trucks', async () => {
    await trucksRepositoryInMemory.create({
      brand_id: '1',
      model_id: '2',
      manufacture_year: 1997,
      model_year: 1997,
      plate: 'ABC1234',
      renavam: 1234,
      truck_type_id: '1234'
    })

    const trucks = await listTrucksUseCase.execute()

    expect(trucks.length).toBe(1)
  })
})