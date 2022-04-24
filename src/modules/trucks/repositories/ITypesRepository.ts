import { ICreateTypeDTO } from '../dtos/ICreateTypeDTO'
import { Type } from '../infra/typeorm/entities/Type'
interface ITypesRepository {
 create({ name, description }: ICreateTypeDTO): Promise<Type>
 findByName(name: string): Promise<Type>
 findById(id: string): Promise<Type>
 list(): Promise<Type[]>
}

export { ITypesRepository }