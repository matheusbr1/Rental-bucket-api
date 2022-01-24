import { Request, Response } from "express"
import { CreateTruckUseCase } from './CreateTruckUseCase'

class CreateTruckController {
  constructor(private createTruckUseCase: CreateTruckUseCase) {}

  handle(request: Request, response: Response): Response {
    const { brandId, modelId, typeId, plate, renavam, year } = request.body

    this.createTruckUseCase.execute({ brandId, modelId, typeId, plate, renavam, year })

    return response.status(201).send()
  }
}

export { CreateTruckController }