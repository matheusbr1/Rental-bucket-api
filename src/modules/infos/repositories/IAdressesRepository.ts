import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO"
import { Address } from "../infra/typeorm/entities/Address"

interface IAdressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>
  findByCEP(CEP: string): Promise<Address>
}

export { IAdressesRepository }