import { CustomersRepositoryInMemory } from "../../repositories/in-memory/CustomersRepositoryInMemory"
import { ListCustomersUseCase } from "./ListCustomersUseCase"

let customersRepositoryInMemory: CustomersRepositoryInMemory
let listCustomersUseCase: ListCustomersUseCase

describe('List Customers', () => {
  beforeEach(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory()
    listCustomersUseCase = new ListCustomersUseCase(customersRepositoryInMemory)
  })

  it('should be able to list all customers', async () => {
    await customersRepositoryInMemory.create({
      person_type: 'F',
      name: 'Jhon Doe',
      CPF_CNPJ: 99005261552,
    })

    const customers = await listCustomersUseCase.execute()

    expect(customers.length).toBe(1)
  })
})