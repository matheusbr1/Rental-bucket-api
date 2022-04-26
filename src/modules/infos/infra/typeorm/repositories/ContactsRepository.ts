import { getRepository, Repository } from "typeorm";
import { ICreateContactDTO } from "../../../dtos/ICreateContactDTO";
import { IContactsRepository } from "../../../repositories/IContactsRepository";
import { Contact } from "../entities/Contact";

class ContactsRepository implements IContactsRepository{
  repository: Repository<Contact>

  constructor() {
    this.repository = getRepository(Contact)
  }

  async create({ 
    contact, 
    contact_type, 
    customer_id,
    driver_id
  }: ICreateContactDTO): Promise<Contact> {
    const newContact = this.repository.create({ 
      contact, 
      contact_type, 
      customer_id,
      driver_id
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