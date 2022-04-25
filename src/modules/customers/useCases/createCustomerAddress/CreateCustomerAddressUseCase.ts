import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCustomerAddressDTO } from "../../dtos/ICreateCustomerAddressDTO";
import { Address } from "../../infra/typeorm/entities/Address";
import { IAdressesRepository } from "../../repositories/IAdressesRepository";

@injectable()
class CreateCustomerAddressUseCase {
  constructor (
    @inject('AdressesRepository')
    private adressesRepository: IAdressesRepository
  ) {}

  async execute(data: ICreateCustomerAddressDTO): Promise<Address> {
    const addressAlreadyExists = await this.adressesRepository.findByCEP(data.CEP)

    if (addressAlreadyExists) {
      throw new AppError('Address already exists')
    }

    const address = await this.adressesRepository.create(data)

    return address
  }
}

export { CreateCustomerAddressUseCase }