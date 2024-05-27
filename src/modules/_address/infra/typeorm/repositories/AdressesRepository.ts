import { getRepository, Repository } from "typeorm";
import { ICreateAddressDTO } from "../../../dtos/ICreateAddressDTO";
import { IAdressesRepository } from "../../../repositories/IAdressesRepository";
import { Address } from "../entities/Address";

class AdressesRepository implements IAdressesRepository {
  repository: Repository<Address>

  constructor() {
    this.repository = getRepository(Address)
  }

  async create(data: ICreateAddressDTO): Promise<Address> {
    const address = this.repository.create(data)

    await this.repository.save(address)

    return address
  }

  async findByCEP(CEP: string): Promise<Address> {
    return this.repository.findOne({ CEP })
  }

  async findById(id: string): Promise<Address> {
    return this.repository.findOne(id)
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id)
  }
}

export { AdressesRepository }