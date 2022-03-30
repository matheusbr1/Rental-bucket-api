import { ICreateTypeDTO } from "../../dtos/ICreateTypeDTO";
import { Type } from "../../entities/Type";
import { ITypesRepository } from "../ITypesRepository";

class TypesRepository implements ITypesRepository {
  private types: Type[]

  private static INSTANCE: TypesRepository

  private constructor() {
    this.types = []
  }

  public static getInstance(): TypesRepository {
    if (!TypesRepository.INSTANCE) {
      TypesRepository.INSTANCE = new TypesRepository()
    }

    return TypesRepository.INSTANCE
  }

  create({ name }: ICreateTypeDTO): void {
    const type = new Type()

    Object.assign(type, {
      name,
      created_at: new Date()
    })

    this.types.push(type)
  }

  findByName(name: string): Type {
    const type = this.types.find(type => type.name === name)
    
    return type
  }

  list(): Type[] {
    return this.types
  }
}

export { TypesRepository }