import { Type } from '../models/Type'

interface ICreateTypeDTO {
  name: string
}

interface ITypesRepository {
 create({ name }: ICreateTypeDTO): void
 findByName(name: string): Type
 list(): Type[]
}

export { ITypesRepository, ICreateTypeDTO }