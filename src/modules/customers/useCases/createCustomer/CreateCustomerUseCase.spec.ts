import { AppError } from "../../../../shared/errors/AppError"
import { CompaniesRepositoryInMemory } from "../../../companies/repositories/in-memory/CompaniesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/CustomersRepositoryInMemory"
import { CreateCustomerUseCase } from "./CreateCustomerUseCase"

let customersRepositoryInMemory: CustomersRepositoryInMemory
let companiesRepositoryInMemory: CompaniesRepositoryInMemory
let createCustomerUseCase: CreateCustomerUseCase

let company

describe('Create Customer', () => {
  beforeAll(() => {
    company = companiesRepositoryInMemory.create({
      name: 'Company name'
    })
  })

  beforeEach(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory()
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory()
    createCustomerUseCase = new CreateCustomerUseCase(
      customersRepositoryInMemory,
      companiesRepositoryInMemory
    )
  })

  it('should be able to create a customer', async () => {
    const customer = await createCustomerUseCase.execute({
      company_id: company.id,
      adresses: [],
      contacts: [],
      person_type: 'F',
      name: 'Jhon Doe',
      CPF_CNPJ: 99005261552,
    })

    expect(customer).toHaveProperty('id')
  })

  it('should not be able to create a customer with a invalid CPF', async () => {
    expect(async () => {
      await createCustomerUseCase.execute({
        company_id: company.id,
        adresses: [],
        contacts: [],
        person_type: 'F',
        name: 'Jhon Doe',
        CPF_CNPJ: 123,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a customer with a invalid CNPJ', async () => {
    expect(async () => {
      await createCustomerUseCase.execute({
        company_id: company.id,
        adresses: [],
        contacts: [],
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
        company_id: company.id,
        adresses: [],
        contacts: [],
        person_type: 'J',
        CPF_CNPJ: 78786991000177,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a fisic customer without fields', async () => {
    expect(async () => {
      await createCustomerUseCase.execute({
        company_id: company.id,
        adresses: [],
        contacts: [],
        person_type: 'F',
        CPF_CNPJ: 99005261552,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})