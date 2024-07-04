import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { PlaceBucketUseCase } from './PlaceBucketUseCase'

class PlaceBucketController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const placeBucketUseCase = container.resolve(PlaceBucketUseCase)
    await placeBucketUseCase.execute(id)

    return response.json({
      status: 'success',
      message: 'status updated'
    })
  }
}

export { PlaceBucketController }