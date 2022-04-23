import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateEquipmentUseCase } from "./CreateEquipmentUseCase";

class CreateEquipmentController {
  async handle (request: Request, response: Response): Promise<Response> {
    const { name, description, capacity } = request.body

    const createEquipmentUseCase = container.resolve(CreateEquipmentUseCase)

    const equipment = await createEquipmentUseCase.execute({ name, description, capacity })

    return response.status(201).json(equipment)
  }
}

export { CreateEquipmentController }