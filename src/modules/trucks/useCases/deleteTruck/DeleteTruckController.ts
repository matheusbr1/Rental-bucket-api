import { Request, Response } from 'express'
import { container } from "tsyringe"
import { DeleteTruckUseCase } from './DeleteTruckUseCase'

class DeleteTruckController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteTruckUseCase = container.resolve(DeleteTruckUseCase)

    await deleteTruckUseCase.execute(id)

    return response.json({ 
      status: 'success',
      message: 'Register delete sucessfuly'
     })
  }
}

export { DeleteTruckController }