import { Request, Response } from 'express'
import { container } from "tsyringe"
import { DeleteWorkUseCase } from "./DeleteWorkUseCase"

class DeleteWorkController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteWorkUseCase = container.resolve(DeleteWorkUseCase)

    await deleteWorkUseCase.execute(id)

    return response.json({ 
      status: 'success',
      message: 'Register delete sucessfuly'
     })
  }
}

export { DeleteWorkController }