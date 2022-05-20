import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { ICreateContactDTO } from "../../dtos/ICreateContactDTO"
import { Contact } from "../../infra/typeorm/entities/Contact"
import { IContactsRepository } from "../../repositories/IContactsRepository"

@injectable()
class CreateContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ 
    contact, 
    contact_type, 
    customer_id,
    driver_id,
  }: ICreateContactDTO): Promise<Contact> {
    if(!customer_id && !driver_id) {
      throw new AppError('missing customer_id or driver_id')
    }

    const newContact = await this.contactsRepository.create({ 
      contact, 
      contact_type,
      customer_id,
      driver_id
    })

    return newContact
  }
}

export { CreateContactUseCase }