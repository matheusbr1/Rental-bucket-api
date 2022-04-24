import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCustomerContactUseCase } from "./CreateCustomerContactUseCase";

class CreateCustomerContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contact, contact_type, customer_id } = request.body

    const createCustomerContactUseCase = container.resolve(CreateCustomerContactUseCase)

    const newContact = await createCustomerContactUseCase.execute({ 
      contact, 
      contact_type,
      customer_id
     })

    return response.status(201).json(newContact)
  }
}

export { CreateCustomerContactController }