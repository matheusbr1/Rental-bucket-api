import { container } from 'tsyringe'
import { UserRepository } from '../../modules/accounts/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository
)