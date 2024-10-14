import { ICreateContactDTO } from "../../dtos/ICreateContactDTO"
import { IContactsRepository } from "../IContactsRepository"
import { Contact } from "../../infra/typeorm/entities/Contact"

class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: Contact[] = []

  async create(data: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact()

    Object.assign(contact, data)

    this.contacts.push(contact)

    return contact
  }

  async findContact(contactInfo: string): Promise<Contact> {
    return this.contacts.find(contact => contact.contact === contactInfo)
  }

  async list(): Promise<Contact[]> {
    return this.contacts
  }

  async findById(id: string): Promise<Contact> {
    return this.contacts.find(contact => contact.id === id)
  }

  async delete(id: string): Promise<void> {
    this.contacts = this.contacts.filter(contact => contact.id !== id)
  }
}

export { ContactsRepositoryInMemory }