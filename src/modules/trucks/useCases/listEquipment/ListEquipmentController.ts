import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListEquipmentUseCase } from "./ListEquipmentUseCase";

class ListEquipmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listEquipmentUseCase = container.resolve(ListEquipmentUseCase)

    const allEquipments = await listEquipmentUseCase.execute()

    return response.json(allEquipments)
  }
}

export { ListEquipmentController }