import { ICreateCustomerAddressDTO } from "../dtos/ICreateCustomerAddressDTO"
import { Address } from "../infra/typeorm/entities/Address"

interface IAdressesRepository {
  create(data: ICreateCustomerAddressDTO): Promise<Address>
  findByCEP(CEP: string): Promise<Address>
}

export { IAdressesRepository }