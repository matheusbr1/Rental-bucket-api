import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCompanyUseCase } from './DeleteCompanyUseCase'

class DeleteCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteCompanyUseCase = container.resolve(DeleteCompanyUseCase)

    await deleteCompanyUseCase.execute(id)

    return response.json({
      status: 'success',
      message: 'Register delete sucessfuly'
    })
  }
}

export { DeleteCompanyController }
