import * as validator from 'cpf-cnpj-validator'
import { container, inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCustomerDTO } from '../../dtos/ICreateCustomerDTO';
import { Customer } from '../../infra/typeorm/entities/Customer';
import { ICustomerRepository } from "../../repositories/ICustomersRepository";
import { CompaniesRepository } from '../../../companies/infra/typeorm/repositories/CompaniesRepository';
import { CreateAddressUseCase } from '../../../_address/useCases/createAddress/CreateAddressUseCase';
import { CreateContactUseCase } from '../../../_contact/useCases/createContact/CreateContactUseCase';

const person_type = {
  fisic: 'F',
  juridic: 'J'
}

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customerRepository: ICustomerRepository,

    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository
  ) { }

  async execute(data: ICreateCustomerDTO): Promise<Customer> {
    const companyExists = await this.companiesRepository.findById(data.company_id)

    if (!companyExists) {
      throw new AppError('This company does not exist')
    }

    if (data.person_type === person_type.fisic) {
      const isCPFValid = validator.cpf.isValid(String(data.CPF_CNPJ))

      if (!isCPFValid) {
        throw new AppError('This CPF is invalid')
      }

      if (!data.name) {
        throw new AppError('name missing')
      }
    }

    if (data.person_type === person_type.juridic) {
      const isCNPJValid = validator.cnpj.isValid(String(data.CPF_CNPJ))

      if (!isCNPJValid) {
        throw new AppError("This CNPJ is invalid")
      }

      if (!data.company_name || !data.fantasy_name) {
        throw new AppError('company_name or fantasy_name missing')
      }
    }

    let customerAlreadyExists = await this.customerRepository.findByCPF_CNPJ(data.CPF_CNPJ)

    if (customerAlreadyExists) {
      throw new AppError("Customer already exists")
    }

    const createAddressUseCase = container.resolve(CreateAddressUseCase)
    const createContactUseCase = container.resolve(CreateContactUseCase)

    const customer = await this.customerRepository.create(data)

    const addressesPromises = data.adresses.map(address => {
      return createAddressUseCase.execute({
        ...address,
        customer_id: customer.id
      })
    })

    const contactPromises = data.contacts.map(contact => {
      return createContactUseCase.execute({
        ...contact,
        customer_id: customer.id
      })
    })

    const adresses = await Promise.all(addressesPromises)
    const contacts = await Promise.all(contactPromises)

    return {
      ...customer,
      adresses,
      contacts
    }
  }
}

export { CreateCustomerUseCase }