import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../shared/errors/AppError"
import { Address } from "../../infra/typeorm/entities/Address"
import { IAdressesRepository } from "../../repositories/IAdressesRepository"

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('AdressesRepository')
    private adressesRepository: IAdressesRepository
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('Missing address id')
    }

    const address = await this.adressesRepository.findById(id)

    if (!address) {
      throw new AppError('Address does not exists')
    }

    await this.adressesRepository.delete(id)

    return
  }
}

export { DeleteAddressUseCase }