import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateAddressDTO } from "../../dtos/ICreateAddressDTO";
import { Address } from "../../infra/typeorm/entities/Address";
import { IAdressesRepository } from "../../repositories/IAdressesRepository";
import axios from 'axios'

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject('AdressesRepository')
    private adressesRepository: IAdressesRepository
  ) { }

  async execute(data: ICreateAddressDTO): Promise<Address> {
    if (!data.customer_id && !data.driver_id && !data.company_id) {
      throw new AppError('missing customer_id or driver_id or company_id')
    }

    const response = await axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${data.CEP}&key=${process.env.GOOGLE_API_KEY}`)

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      const address = await this.adressesRepository.create({
        ...data,
        lat: location.lat,
        lng: location.lng
      })
      return address
    } else {
      const address = await this.adressesRepository.create(data)
      return address
    }
  }
}

export { CreateAddressUseCase }