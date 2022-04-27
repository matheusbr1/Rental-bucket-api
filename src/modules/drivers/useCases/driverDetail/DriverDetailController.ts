import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DriverDetailUseCase } from './DriverDetailUseCase'
import { instanceToPlain } from "class-transformer";


class DriverDetailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const driverDetailUseCase = container.resolve(DriverDetailUseCase)

    const driver = await driverDetailUseCase.execute(id)

    return response.json(instanceToPlain(driver))
  }
}

export { DriverDetailController }