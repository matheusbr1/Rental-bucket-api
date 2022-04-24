import { ICreateCustomerContactDTO } from "../dtos/ICreateCustomerContactDTO";
import { Contact } from "../infra/typeorm/entities/Contact";

interface IContactsRepository {
  create({ contact, contact_type, customer_id }: ICreateCustomerContactDTO): Promise<Contact>
  findContact(contactInfo: string): Promise<Contact>
  list(): Promise<Contact[]>
}

export { IContactsRepository }