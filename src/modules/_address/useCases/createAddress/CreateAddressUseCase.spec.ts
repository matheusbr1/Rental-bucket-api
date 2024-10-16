import { AdressesRepositoryInMemory } from "../../repositories/in-memory/AdressesRepositoryInMemory"
import { CreateAddressUseCase } from "./CreateAddressUseCase"

let adressesRepositoryInMemory: AdressesRepositoryInMemory
let createAddressUseCase: CreateAddressUseCase

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

describe('Create Address', () => {
  beforeEach(() => {
    adressesRepositoryInMemory = new AdressesRepositoryInMemory()
    createAddressUseCase = new CreateAddressUseCase(adressesRepositoryInMemory)
  })

  it('should be able to create a address', async () => {
    const address = await createAddressUseCase.execute({
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