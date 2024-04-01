import { inject, injectable } from 'tsyringe'
import { ICreateWorkDTO } from '../../dtos/ICreateWorkDTO'
import { Work } from '../../infra/typeorm/entities/Work'
import { IWorksRepository } from '../../repositories/IWorksRepository'
import { CompaniesRepository } from '../../../companies/infra/typeorm/repositories/CompaniesRepository'
import { AppError } from '../../../../shared/errors/AppError'

@injectable()
class CreateWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository,

    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository
  ) { }

  async execute(data: ICreateWorkDTO): Promise<Work> {
    const companyExists = await this.companiesRepository.findById(data.company_id)

    if (!companyExists) {
      throw new AppError('This company does not exist')
    }

    const work = await this.worksRepository.create(data)

    return work
  }
}

export { CreateWorkUseCase }