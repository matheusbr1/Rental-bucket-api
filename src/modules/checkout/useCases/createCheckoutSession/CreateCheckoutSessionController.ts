import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCheckoutSessionUseCase } from "./CreateCheckoutSessionUseCase";

class CreateCheckoutSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params

    const createCheckoutSessionUseCase = container.resolve(CreateCheckoutSessionUseCase)

    const checkout = await createCheckoutSessionUseCase.execute(userId)

    return response.json(checkout)
  }
}

export { CreateCheckoutSessionController }