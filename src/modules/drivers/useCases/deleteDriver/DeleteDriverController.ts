import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteDriverUseCase } from './DeleteDriverUseCase'

class DeleteDriverController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteDriverUseCase = container.resolve(DeleteDriverUseCase)

    await deleteDriverUseCase.execute(id)

    return response.json({ 
      status: 'success',
      message: 'Register delete sucessfuly'
     })
  } 
}

export { DeleteDriverController }