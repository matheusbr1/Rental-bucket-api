import { AppError } from "../../../../shared/errors/AppError"
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/CustomersRepositoryInMemory"
import { CreateCustomerUseCase } from "./CreateCustomerUseCase"


let customersRepositoryInMemory: CustomersRepositoryInMemory
let createCustomerUseCase: CreateCustomerUseCase

describe('Create Customer', () => {
  beforeEach(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory()
    createCustomerUseCase = new CreateCustomerUseCase(customersRepositoryInMemory)
  })

  it('should be able to create a customer', async () => {
    const customer = await createCustomerUseCase.execute({
      person_type: 'F',
      name: 'Jhon Doe',
      CPF_CNPJ: 99005261552,
    })

    expect(customer).toHaveProperty('id')
  })

  it('should not be able to create a customer with a invalid CPF', async () => {
    expect(async () => {
      await createCustomerUseCase.execute({
        person_type: 'F',
        name: 'Jhon Doe',
        CPF_CNPJ: 123,
      })  
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a customer with a invalid CNPJ', async () => {
    expect(async () => {
      await createCustomerUseCase.execute({
        person_type: 'J',
        company_name: 'Fake Enterprise LTDA',
        fantasy_name: 'Fake Enterprise',
        CPF_CNPJ: 123,
      })  
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a juridic customer without fields', async () => {
    expect(async () => {
      await createCustomerUseCase.execute({
        person_type: 'J',
        CPF_CNPJ: 78786991000177,
      })  
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a fisic customer without fields', async () => {
    expect(async () => {
      await createCustomerUseCase.execute({
        person_type: 'F',
        CPF_CNPJ: 99005261552,
      })  
    }).rejects.toBeInstanceOf(AppError)
  })
})