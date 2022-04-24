import { getRepository, Repository } from "typeorm"
import { ICreateTypeDTO } from "../../../dtos/ICreateTypeDTO"
import { ITypesRepository } from "../../../repositories/ITypesRepository"
import { Type } from "../entities/Type"

class TypesRepository implements ITypesRepository {
  repository: Repository<Type>

  constructor() {
    this.repository = getRepository(Type)
  }

  async create({ name, description }: ICreateTypeDTO): Promise<Type> {
    const truckType = this.repository.create({
      name,
      description
    })

    await this.repository.save(truckType)

    return truckType
  }

  async findByName(name: string): Promise<Type> {
    return await this.repository.findOne({ name })
  }

  async list(): Promise<Type[]> {
    return await this.repository.find()
  }
}

export { TypesRepository }