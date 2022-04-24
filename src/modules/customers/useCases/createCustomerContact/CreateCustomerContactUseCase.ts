import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateCustomerContactDTO } from "../../dtos/ICreateCustomerContactDTO"
import { Contact } from "../../infra/typeorm/entities/Contact"
import { IContactsRepository } from "../../repositories/IContactsRepository"

@injectable()
class CreateCustomerContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ 
    contact, 
    contact_type, 
    customer_id 
  }: ICreateCustomerContactDTO): Promise<Contact> {
    const contactAlreadyExists = await this.contactsRepository.findContact(contact)

    if (contactAlreadyExists) {
      throw new AppError('Contact already exists')
    }

    const newContact = await this.contactsRepository.create({ 
      contact, 
      contact_type,
      customer_id
    })

    return newContact
  }
}

export { CreateCustomerContactUseCase }