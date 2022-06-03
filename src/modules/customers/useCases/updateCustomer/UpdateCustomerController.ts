import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCustomerUseCase } from "./UpdateCustomerUseCase";

class UpdateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body

    const { id } = request.params

    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase)

    const updatedCustomer = await updateCustomerUseCase.execute(id, data)

    return response.json({
      message: 'Costumer updated!',
      data: updatedCustomer
    })
  } 
}

export { UpdateCustomerController }