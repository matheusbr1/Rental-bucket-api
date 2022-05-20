import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateAddressDTO } from "../../dtos/ICreateAddressDTO";
import { Address } from "../../infra/typeorm/entities/Address";
import { IAdressesRepository } from "../../repositories/IAdressesRepository";

@injectable()
class CreateAddressUseCase {
  constructor (
    @inject('AdressesRepository')
    private adressesRepository: IAdressesRepository
  ) {}

  async execute(data: ICreateAddressDTO): Promise<Address> {
    if(!data.customer_id && !data.driver_id) {
      throw new AppError('missing customer_id or driver_id')
    }
    
    const address = await this.adressesRepository.create(data)

    return address
  }
}

export { CreateAddressUseCase }