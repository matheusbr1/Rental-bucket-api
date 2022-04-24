import { ICreateCustomerContactDTO } from "../../dtos/ICreateCustomerContactDTO";
import { Contact } from "../../infra/typeorm/entities/Contact";
import { IContactsRepository } from "../IContactsRepository";

class ContactsRepositoryInMemory implements IContactsRepository {
  private contacts: Contact[] = []

  async create({ contact, contact_type, customer_id }: ICreateCustomerContactDTO): Promise<Contact> {
    const newContact = new Contact()

    Object.assign(newContact, {
      contact, 
      contact_type,
      customer_id
    })

    this.contacts.push(newContact)

    return newContact
  }

  async findContact(contactInfo: string): Promise<Contact> {
    return this.contacts.find(contact => contact.contact === contactInfo)
  }

  async list(): Promise<Contact[]> {
    return this.contacts
  }
}

export { ContactsRepositoryInMemory }