import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateContactUseCase } from "./CreateContactUseCase";
import { instanceToPlain } from "class-transformer";

class CreateContactController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { contact, contact_type, customer_id } = request.body

    const createContactUseCase = container.resolve(CreateContactUseCase)

    const newContact = await createContactUseCase.execute({ 
      contact, 
      contact_type,
      customer_id
     })

    return response.status(201).json(instanceToPlain(newContact))
  }
}

export { CreateContactController }