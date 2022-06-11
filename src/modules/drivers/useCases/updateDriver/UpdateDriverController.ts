import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateDriverUseCase } from "./UpdateDriverUseCase";

class UpdateDriverController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const { id } = request.params

    const updateDriverUseCase = container.resolve(UpdateDriverUseCase)

    const updatedDriver = await updateDriverUseCase.execute(id, data)

    return response.json({
      message: 'register updated',
      data: updatedDriver
    })
  }
}

export { UpdateDriverController }