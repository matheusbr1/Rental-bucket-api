import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UserRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)

    return user
  }

  async findByStripeCustomerId(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: { stripe_customer_id: id }
    });

    return user;
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(userData)
    const created = await this.repository.save(user)
    return created
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      email
    })

    return user
  }
}

export { UserRepository }