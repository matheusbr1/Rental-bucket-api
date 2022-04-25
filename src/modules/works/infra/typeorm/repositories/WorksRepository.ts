import { ICreateWorkDTO } from "../../../dtos/ICreateWorkDTO"
import { IWorksRepository } from "../../../repositories/IWorksRepository"
import { Work } from "../entities/Work"

class WorksRepository implements IWorksRepository {
  private works: Work[]

  private static INSTANCE: WorksRepository

  private constructor () {
    this.works = []
  }

  // SINGLETON pattern
  public static getIntance(): WorksRepository {
    if(!WorksRepository.INSTANCE) {
      WorksRepository.INSTANCE = new WorksRepository()
    }

    return WorksRepository.INSTANCE
  }

  create(data: ICreateWorkDTO): void {
    const work = new Work()
  
    Object.assign(work, {
      ...data,
      created_at: new Date()
    })
  
    this.works.push(work)
  }

  list(): Work[] {
    return this.works
  }

  findByClient(CPF_CNPJ: number): Work | Work[] {
    const works = this.works.find(work => work.customer_CPF_CNPJ === CPF_CNPJ)

    return works
  }
}

export { WorksRepository }