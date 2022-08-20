import { inject, injectable } from 'tsyringe'
import { ICreateWorkDTO } from '../../dtos/ICreateWorkDTO'
import { Work } from '../../infra/typeorm/entities/Work'
import { IWorksRepository } from '../../repositories/IWorksRepository'

@injectable()
class CreateWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository
  ) {}

  async execute(data: ICreateWorkDTO): Promise<Work> {
    const work = await this.worksRepository.create(data)

    return work
  }
}

export { CreateWorkUseCase }