import { AdressesRepositoryInMemory } from "../../../_address/repositories/in-memory/AdressesRepositoryInMemory";
import { CreateAddressUseCase } from "../../../_address/useCases/createAddress/CreateAddressUseCase";
import { ContactsRepositoryInMemory } from "../../../_contact/repositories/in-memory/ContactsRepositoryInMemory";
import { CreateContactUseCase } from "../../../_contact/useCases/createContact/CreateContactUseCase";
import { CompaniesRepositoryInMemory } from "../../../companies/repositories/in-memory/CompaniesRepositoryInMemory"
import { DriversRepositoryInMemory } from "../../repositories/in-memory/DriversRepositoryInMemory"
import { CreateDriverUseCase } from "./CreateDriverUseCase"

let driversRepositoryInMemory: DriversRepositoryInMemory
let companiesRepositoryInMemory: CompaniesRepositoryInMemory

let addressRepositoryInMemory: AdressesRepositoryInMemory
let contactsRepositoryInMemory: ContactsRepositoryInMemory
let createAddressUseCase: CreateAddressUseCase
let createContactUseCase: CreateContactUseCase

let createDriverUseCase: CreateDriverUseCase


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

describe('Create Driver', () => {
  beforeEach(() => {
    driversRepositoryInMemory = new DriversRepositoryInMemory()
    companiesRepositoryInMemory = new CompaniesRepositoryInMemory()

    addressRepositoryInMemory = new AdressesRepositoryInMemory()
    contactsRepositoryInMemory = new ContactsRepositoryInMemory()

    createAddressUseCase = new CreateAddressUseCase(addressRepositoryInMemory)
    createContactUseCase = new CreateContactUseCase(contactsRepositoryInMemory)

    createDriverUseCase = new CreateDriverUseCase(
      driversRepositoryInMemory,
      companiesRepositoryInMemory,
      createAddressUseCase,
      createContactUseCase
    )
  })

  it('should be able to create driver', async () => {
    const company = await companiesRepositoryInMemory.create({
      name: 'Company name'
    })

    const driver = await createDriverUseCase.execute({
      company_id: company.id,
      name: 'Jhon Doe',
      CPF: 99005261552,
      CNH: 1234564,
      RG: '228652662',
      birthday: '01/03/1974',
      address: null,
      contacts: []
    })

    expect(driver).toHaveProperty('id')
  })
})