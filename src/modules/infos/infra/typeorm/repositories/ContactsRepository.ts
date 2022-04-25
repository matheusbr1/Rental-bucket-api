import { getRepository, Repository } from "typeorm";
import { ICreateCustomerContactDTO } from "../../../dtos/ICreateCustomerContactDTO";
import { IContactsRepository } from "../../../repositories/IContactsRepository";
import { Contact } from "../entities/Contact";

class ContactsRepository implements IContactsRepository{
  repository: Repository<Contact>

  constructor() {
    this.repository = getRepository(Contact)
  }

  async create({ contact, contact_type, customer_id }: ICreateCustomerContactDTO): Promise<Contact> {
    const newContact = this.repository.create({ 
      contact, 
      contact_type, 
      customer_id 
    })

    await this.repository.save(newContact)

    return newContact
  }

  async findContact(contactInfo: string): Promise<Contact> {
    return this.repository.findOne({ contact: contactInfo })
  }

  async list(): Promise<Contact[]> {
    return this.repository.find()
  }
}

export { ContactsRepository }