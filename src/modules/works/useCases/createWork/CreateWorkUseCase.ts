import { inject, injectable } from 'tsyringe'
import { ICreateWorkDTO } from '../../dtos/ICreateWorkDTO'
import { Work } from '../../infra/typeorm/entities/Work'
import { IWorksRepository } from '../../repositories/IWorksRepository'
import { CompaniesRepository } from '../../../companies/infra/typeorm/repositories/CompaniesRepository'
import { AppError } from '../../../../shared/errors/AppError'
import { MAX_FREE_PLAN } from '../../../../config/plan'

@injectable()
class CreateWorkUseCase {
  constructor(
    @inject('WorksRepository')
    private worksRepository: IWorksRepository,
    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository
  ) { }

  async execute(data: ICreateWorkDTO): Promise<Work> {
    const company = await this.companiesRepository.findById(data.company_id)

    if (!company) {
      throw new AppError('[work] This company does not exist')
    }

    const { total } = await this.worksRepository.listByCompanyId({
      company_id: data.company_id,
      limit: 1,
      page: 1,
      status: 'all'
    })

    if (!company.hasSubscription) {
      if (total >= MAX_FREE_PLAN.works) {
        const message = `To register more than ${MAX_FREE_PLAN.works} works buy premium plan.`
        throw new AppError(message, 400, 'plan')
      }
    }

    const work = await this.worksRepository.create(data)

    return work
  }
}

export { CreateWorkUseCase }