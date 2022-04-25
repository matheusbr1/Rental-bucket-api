import { AdressesRepositoryInMemory } from "../../repositories/in-memory/AdressesRepositoryInMemory"
import { CreateCustomerAddressUseCase } from "./CreateCustomerAddressUseCase"

let adressesRepositoryInMemory: AdressesRepositoryInMemory
let createCustomerAddressUseCase: CreateCustomerAddressUseCase

describe('Create Customer Address', () => {
  beforeEach(() => {
    adressesRepositoryInMemory = new AdressesRepositoryInMemory()
    createCustomerAddressUseCase = new CreateCustomerAddressUseCase(adressesRepositoryInMemory)
  })

  it('should be able to create a customer address', async () => {
    const address = await createCustomerAddressUseCase.execute({
      CEP: '06065220',
      street: 'Rua santo Roverco',
      number: 22,
      state: 'SP',
      city: 'Osasco',
      neighborhood: 'Jaguaribe',
      customer_id: '123'
    })

    expect(address).toHaveProperty('id')
  })
})