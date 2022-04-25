import { getRepository, Repository } from "typeorm";
import { ICreateCustomerAddressDTO } from "../../../dtos/ICreateCustomerAddressDTO";
import { IAdressesRepository } from "../../../repositories/IAdressesRepository";
import { Address } from "../entities/Address";

class AdressesRepository implements IAdressesRepository {
  repository: Repository<Address>

  constructor() {
    this.repository = getRepository(Address)
  }

  async create(data: ICreateCustomerAddressDTO): Promise<Address> {
    const address = this.repository.create(data)

    await this.repository.save(address)

    return address
  }

  async findByCEP(CEP: string): Promise<Address> {
    return this.repository.findOne({ CEP })
  }
}

export { AdressesRepository }