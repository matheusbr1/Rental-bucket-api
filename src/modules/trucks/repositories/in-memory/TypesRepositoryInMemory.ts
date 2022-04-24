import { ICreateTypeDTO } from "../../dtos/ICreateTypeDTO";
import { Type } from "../../infra/typeorm/entities/Type";
import { ITypesRepository } from "../ITypesRepository";

class TypesRepositoryInMemory implements ITypesRepository {
  types: Type[] = []

  async create({ name, description }: ICreateTypeDTO): Promise<Type> {
    const truckType = new Type()

    Object.assign(truckType, {
      name, 
      description,
    })

    this.types.push(truckType)

    return truckType
  }

  async findByName(name: string): Promise<Type> {
    return this.types.find(type => type.name === name)
  }

  async findById(id: string): Promise<Type> {
    return this.types.find(type => type.id === id)
  }

  async list(): Promise<Type[]> {
    return this.types
  }
}

export { TypesRepositoryInMemory }