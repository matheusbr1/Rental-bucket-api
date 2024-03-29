import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateTruckUseCase } from './CreateTruckUseCase'

class CreateTruckController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand_id,
      model_id,
      truck_type_id,
      plate,
      renavam,
      manufacture_year,
      model_year,
      company_id
    } = request.body

    const createTruckUseCase = container.resolve(CreateTruckUseCase)

    const truck = await createTruckUseCase.execute({
      brand_id,
      model_id,
      truck_type_id,
      plate,
      renavam,
      manufacture_year,
      model_year,
      company_id
    })

    return response.status(201).json(truck)
  }
}

export { CreateTruckController }