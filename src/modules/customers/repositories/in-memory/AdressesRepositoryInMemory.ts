import { ICreateCustomerAddressDTO } from "../../dtos/ICreateCustomerAddressDTO";
import { Address } from "../../infra/typeorm/entities/Address";
import { IAdressesRepository } from "../IAdressesRepository";

class AdressesRepositoryInMemory implements IAdressesRepository {
  private adresses: Address[] = []

  async create(data: ICreateCustomerAddressDTO): Promise<Address> {
    const address = new Address()

    Object.assign(address, data)

    this.adresses.push(address)

    return address
  }

  async findByCEP(CEP: string): Promise<Address> {
    return this.adresses.find(address => address.CEP === CEP)
  }
}

export { AdressesRepositoryInMemory }