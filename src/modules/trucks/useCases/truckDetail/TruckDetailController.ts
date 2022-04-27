import { Request, Response } from "express";
import { container } from "tsyringe";
import { instanceToPlain } from "class-transformer";
import { TruckDetailUseCase } from "./TruckDetailUseCase";

class TruckDetailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const truckDetailUseCase = container.resolve(TruckDetailUseCase)

    const truck = await truckDetailUseCase.execute(id)

    return response.json(instanceToPlain(truck))
  }
}

export { TruckDetailController }