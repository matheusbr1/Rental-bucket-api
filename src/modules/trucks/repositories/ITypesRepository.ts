import { ICreateTypeDTO } from '../dtos/ICreateTypeDTO'
import { Type } from '../entities/Type'
interface ITypesRepository {
 create({ name }: ICreateTypeDTO): void
 findByName(name: string): Type
 list(): Type[]
}

export { ITypesRepository }