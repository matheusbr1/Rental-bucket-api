import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { IContactsRepository } from "../../repositories/IContactsRepository"

@injectable()
class DeleteContactUseCase {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('Missing contact id')
    }

    const contact = await this.contactsRepository.findById(id)

    if (!contact) {
      throw new AppError('Contact does not exists')
    }

    await this.contactsRepository.delete(id)

    return
  }
}

export { DeleteContactUseCase }