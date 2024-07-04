import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CancelWorkUseCase } from './CancelWorkUseCase'

class CancelWorkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const cancelWorkUseCase = container.resolve(CancelWorkUseCase)
    await cancelWorkUseCase.execute(id)

    return response.json({
      status: 'success',
      message: 'status updated'
    })
  }
}

export { CancelWorkController }