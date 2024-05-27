import { ContactsRepositoryInMemory } from "../../repositories/in-memory/ContactsRepositoryInMemory"
import { CreateContactUseCase } from "./CreateContactUseCase"

let contactsRepositoryInMemory: ContactsRepositoryInMemory
let createContactUseCase: CreateContactUseCase

describe('Create Contact', () => {
  beforeEach(() => {
    contactsRepositoryInMemory = new ContactsRepositoryInMemory()
    createContactUseCase = new CreateContactUseCase(contactsRepositoryInMemory)
  })

  it('should be able create a new phone contact', async () => {
    const newContact = await createContactUseCase.execute({
      contact: '1136913428',
      contact_type: 'phone',
      customer_id: '123'
    })

    expect(newContact).toHaveProperty('id')
  })

  it('should be able create a new cellphone contact', async () => {
    const newContact = await createContactUseCase.execute({
      contact: '11978035721',
      contact_type: 'cellphone',
      customer_id: '123'
    })

    expect(newContact).toHaveProperty('id')
  })

  it('should be able create a new email contact', async () => {
    const newContact = await createContactUseCase.execute({
      contact: 'jhondoe@gmail.com',
      contact_type: 'email',
      customer_id: '123'
    })

    expect(newContact).toHaveProperty('id')
  })
})