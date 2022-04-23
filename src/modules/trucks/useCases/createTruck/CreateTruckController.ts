import { Request, Response } from "express"
import { CreateTruckUseCase } from './CreateTruckUseCase'

class CreateTruckController {
  constructor(private createTruckUseCase: CreateTruckUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      brandId, 
      modelId, 
      typeId, 
      plate, 
      renavam, 
      manufactureYear,
      modelYear,
    } = request.body

    await this.createTruckUseCase.execute({ 
      brandId, 
      modelId, 
      typeId, 
      plate, 
      renavam, 
      manufactureYear,
      modelYear
    })

    return response.status(201).send()
  }
}

export { CreateTruckController }