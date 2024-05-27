import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO"
import { Address } from "../infra/typeorm/entities/Address"

interface IAdressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>
  findByCEP(CEP: string): Promise<Address>
  findById(id: string): Promise<Address>
  delete(id: string): Promise<void>
}

export { IAdressesRepository }