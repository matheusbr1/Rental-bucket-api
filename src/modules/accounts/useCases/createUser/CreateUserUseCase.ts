import { inject, injectable } from "tsyringe"
import { hash } from 'bcryptjs'
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../shared/errors/AppError"
import { CompaniesRepository } from "../../../companies/infra/typeorm/repositories/CompaniesRepository"
import { createStripeCustomer } from "../../../../config/stripe"
import { User } from "../../infra/typeorm/entities/User"
@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompaniesRepository')
    private companiesRepository: CompaniesRepository
  ) { }

  async execute({ name, email, password, company_id }: ICreateUserDTO): Promise<User> {
    if (!company_id) {
      throw new AppError('Field company_id is missing')
    }

    const companyExists = await this.companiesRepository.findById(company_id)

    if (!companyExists) {
      throw new AppError('This company does not exist')
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const passwordHash = await hash(password, 8)

    const stripeCustomer = await createStripeCustomer({
      email,
      name
    })

    const user = await this.usersRepository.create({
      company_id,
      name,
      email,
      password: passwordHash,
      stripe_customer_id: stripeCustomer.id
    })

    return user
  }
}

export { CreateUserUseCase }