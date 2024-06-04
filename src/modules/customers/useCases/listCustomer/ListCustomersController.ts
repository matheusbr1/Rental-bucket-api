import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCustomersUseCase } from "./ListCustomersUseCase";
import { instanceToPlain } from "class-transformer";

class ListCustomersCotroller {
  async handle(request: Request, response: Response): Promise<Response> {
    const query = request.query

    const listCustomersUseCase = container.resolve(ListCustomersUseCase)

    const out = await listCustomersUseCase.execute({
      company_id: String(query.company_id),
      limit: Number(query.limit ?? 10),
      page: Number(query.page)
    })

    response.set('X-Total-Count', out.total.toString())
    response.set('X-Page-Count', out.pageCount.toString())
    return response.json(instanceToPlain(out))
  }
}

export { ListCustomersCotroller }