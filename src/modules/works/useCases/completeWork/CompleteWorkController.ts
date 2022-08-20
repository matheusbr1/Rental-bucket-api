import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CompleteWorkUseCase } from './CompleteWorkUseCase'

class CompleteWorkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const completeWorkUseCase = container.resolve(CompleteWorkUseCase)

    await completeWorkUseCase.execute(id)

    return response.json({
      status: 'success',
      message: 'work marked as done successfully'
    })
  }
}

export { CompleteWorkController }