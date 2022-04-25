import { ICreateContactDTO } from "../dtos/ICreateContactDTO";
import { Contact } from "../infra/typeorm/entities/Contact";

interface IContactsRepository {
  create(data: ICreateContactDTO): Promise<Contact>
  findContact(contactInfo: string): Promise<Contact>
  list(): Promise<Contact[]>
}

export { IContactsRepository }