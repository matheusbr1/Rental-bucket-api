import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { RemoveBucketUseCase } from './RemoveBucketUseCase'

class RemoveBucketController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { quantity } = request.query

    const removeBucketUseCase = container.resolve(RemoveBucketUseCase)
    await removeBucketUseCase.execute(id, Number(quantity))

    return response.json({
      status: 'success',
      message: 'status updated'
    })
  }
}

export { RemoveBucketController }