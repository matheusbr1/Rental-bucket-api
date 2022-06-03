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

  async execute(data: ICreateContactDTO): Promise<Contact> {
    if(!data?.customer_id && !data?.driver_id) {
      throw new AppError('missing customer_id or driver_id')
    }

    const newContact = await this.contactsRepository.create(data)

    return newContact
  }
}

export { CreateContactUseCase }