import { container } from 'tsyringe'
import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { EquipmentsRepository } from '../../modules/trucks/infra/typeorm/repositories/EquipmentsRepository'
import { TrucksRepository } from '../../modules/trucks/infra/typeorm/repositories/TrucksRepository'
import { TypesRepository } from '../../modules/trucks/infra/typeorm/repositories/TypesRepository'
import { IEquipmentsRepository } from '../../modules/trucks/repositories/IEquipmentsRepository'
import { ITrucksRepository } from '../../modules/trucks/repositories/ITrucksRespository'
import { ITypesRepository } from '../../modules/trucks/repositories/ITypesRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository
)

container.registerSingleton<IEquipmentsRepository>(
  'EquipmentsRepository',
  EquipmentsRepository
)

container.registerSingleton<ITypesRepository>(
  'TypesRepository',
  TypesRepository
)

container.registerSingleton<ITrucksRepository>(
  'TrucksRepository',
  TrucksRepository
)