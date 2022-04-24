import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateDriverUseCase } from "../../../drivers/useCases/createDriver/CreateDriverUseCase";

class CreateDriverController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const createDriverUseCase = container.resolve(CreateDriverUseCase)

    const driver = await createDriverUseCase.execute(data)

    return response.status(201).json(driver)
  }
}

export { CreateDriverController }