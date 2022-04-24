import { ContactsRepositoryInMemory } from "../../repositories/in-memory/ContactsRepositoryInMemory"
import { CreateCustomerContactUseCase } from "./CreateCustomerContactUseCase"

let contactsRepositoryInMemory: ContactsRepositoryInMemory
let createCustomerContactUseCase: CreateCustomerContactUseCase

describe('Create Customer Contact', () => {
  beforeEach(() => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory()
    createCustomerContactUseCase = new CreateCustomerContactUseCase(contactsRepositoryInMemory)
  })

  it('should be able create a new customer phone contact', async () => {
    const newContact = await createCustomerContactUseCase.execute({
      contact: '1136913428',
      contact_type: 'phone',
      customer_id: '123'
    })

    expect(newContact).toHaveProperty('id')
  })

  it('should be able create a new customer cellphone contact', async () => {
    const newContact = await createCustomerContactUseCase.execute({
      contact: '11978035721',
      contact_type: 'cellphone',
      customer_id: '123'
    })

    expect(newContact).toHaveProperty('id')
  })

  it('should be able create a new customer email contact', async () => {
    const newContact = await createCustomerContactUseCase.execute({
      contact: 'jhondoe@gmail.com',
      contact_type: 'email',
      customer_id: '123'
    })

    expect(newContact).toHaveProperty('id')
  })
})