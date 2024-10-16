import { AppError } from "../../../../shared/errors/AppError"
import { AdressesRepositoryInMemory } from "../../../_address/repositories/in-memory/AdressesRepositoryInMemory"
import { CreateAddressUseCase } from "../../../_address/useCases/createAddress/CreateAddressUseCase"
import { ContactsRepositoryInMemory } from "../../../_contact/repositories/in-memory/ContactsRepositoryInMemory"
import { CreateContactUseCase } from "../../../_contact/useCases/createContact/CreateContactUseCase"
import { CompaniesRepositoryInMemory } from "../../../companies/repositories/in-memory/CompaniesRepositoryInMemory"
import { CustomersRepositoryInMemory } from "../../repositories/in-memory/CustomersRepositoryInMemory"
import { CreateCustomerUseCase } from "./CreateCustomerUseCase"

jest.mock('axios', () => ({
  get: jest.fn().mockImplementation(() => ({
    data: {
      status: 'OK',
      results: [{
        geometry: {
          location: {
            lat: -23.55107364031963,
            lng: -46.634364162759006
          }
        }
      }]
    }
  }))
}))

let customersRepositoryInMemory: CustomersRepositoryInMemory
let companiesRepositoryInMemory: CompaniesRepositoryInMemory

let addressRepositoryInMemory: AdressesRepositoryInMemory
let contactsRepositoryInMemory: ContactsRepositoryInMemory
let createAddressUseCase: CreateAddressUseCase
let createContactUseCase: CreateContactUseCase

let createCustomerUseCase: CreateCustomerUseCase

describe('Create Customer', () => {
  beforeAll(() => {
    customersRepositoryInMemory = new CustomersRepositoryInMemory()
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory()

    addressRepositoryInMemory = new AdressesRepositoryInMemory()
    contactsRepositoryInMemory = new ContactsRepositoryInMemory()

    createAddressUseCase = new CreateAddressUseCase(addressRepositoryInMemory)
    createContactUseCase = new CreateContactUseCase(contactsRepositoryInMemory)

    createCustomerUseCase = new CreateCustomerUseCase(
      customersRepositoryInMemory,
      companiesRepositoryInMemory,

      createAddressUseCase,
      createContactUseCase
    )
  })

  it('should be able to create a customer', async () => {
    const company = await companiesRepositoryInMemory.create({
      name: 'Company name'
    })

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
    const company = await companiesRepositoryInMemory.create({
      name: 'Company name'
    })
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
    const company = await companiesRepositoryInMemory.create({
      name: 'Company name'
    })
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
    const company = await companiesRepositoryInMemory.create({
      name: 'Company name'
    })
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
    const company = await companiesRepositoryInMemory.create({
      name: 'Company name'
    })
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