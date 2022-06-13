import { Request, Response } from "express"
import { container } from "tsyringe"
import { UpdateTruckUseCase } from "./updateTruckUseCase"

class UpdateTruckController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const { id } = request.params

    const updateTruckUseCase = container.resolve(UpdateTruckUseCase)

    const updatedTruck = await updateTruckUseCase.execute(id, data)

    return response.json({
      message: 'register updated',
      data: updatedTruck
    })
  }
}

export { UpdateTruckController }