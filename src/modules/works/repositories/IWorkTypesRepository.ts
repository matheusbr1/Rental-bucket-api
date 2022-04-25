import { WorkType } from "../infra/typeorm/entities/WorkType"

interface IWorkTypesRepository {
  create({ name }: ICreateWorkTypeDTO): Promise<WorkType>
  findByName(name: string): Promise<WorkType>
  list(): Promise<WorkType[]>
}

export { IWorkTypesRepository }