import { container } from 'tsyringe'
import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { EquipmentsRepository } from '../../modules/trucks/infra/typeorm/repositories/EquipmentsRepository'
import { IEquipmentsRepository } from '../../modules/trucks/repositories/IEquipmentsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository
)

container.registerSingleton<IEquipmentsRepository>(
  'EquipmentsRepository',
  EquipmentsRepository
)