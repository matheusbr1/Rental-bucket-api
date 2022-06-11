import { inject, injectable } from "tsyringe";
import * as validator from 'cpf-cnpj-validator'
import { Customer } from "../../infra/typeorm/entities/Customer";
import { ICustomerRepository } from "../../repositories/ICustomersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";

const person_type = {
  fisic: 'F',
  juridic: 'J'
}

@injectable()
class UpdateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute(id: string, data: ICreateCustomerDTO): Promise<Customer> {
    let customer = await this.customerRepository.findById(id)

    if (!customer) {
      throw new AppError("Customer does not exists")
    }

    if (data.person_type === person_type.fisic) {
      const isCPFValid = validator.cpf.isValid(String(data.CPF_CNPJ))
  
      if (!isCPFValid) {
        throw new AppError('This CPF is invalid')
      } 

      if(!data.name) {
        throw new AppError('name missing')
      }
    } 
    
    if (data.person_type === person_type.juridic) {
      const isCNPJValid = validator.cnpj.isValid(String(data.CPF_CNPJ))

      if (!isCNPJValid) {
        throw new AppError("This CNPJ is invalid")
      }

      if(!data.company_name || !data.fantasy_name) {
        throw new AppError('company_name or fantasy_name missing')
      }
    }

    customer = {
      ...customer,
      person_type: data.person_type,
      CPF_CNPJ: data.CPF_CNPJ,
      company_name:  data?.company_name,
      fantasy_name: data?.fantasy_name,
      name: data?.name
    }

    const updatedCustomer = await this.customerRepository.create(customer)

    return updatedCustomer
  }
}

export { UpdateCustomerUseCase }