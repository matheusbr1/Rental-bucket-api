import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CompanyDetailUseCase } from './CompanyDetailUseCase'
import { instanceToPlain } from "class-transformer";


class CompanyDetailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const companyDetailUseCase = container.resolve(CompanyDetailUseCase)

    const company = await companyDetailUseCase.execute(id)

    return response.json(instanceToPlain(company))
  }
}

export { CompanyDetailController }
