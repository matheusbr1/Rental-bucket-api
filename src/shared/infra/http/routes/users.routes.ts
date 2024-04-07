import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../../../config/upload'
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController'
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController'
import { ensureAutenticated } from '../middlewares/ensureAuthenticated'
import { ListUsersController } from '../../../../modules/accounts/useCases/listUsers/ListUsersController'

const usersRoutes = Router()

// const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const listUsersController = new ListUsersController()
const updateUserAvatarController = new UpdateUserAvatarController()

usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/', listUsersController.handle)

// Utilizado para alterar somente uma informação
// usersRoutes.patch(
//   '/avatar', 
//   ensureAutenticated,
//   uploadAvatar.single('avatar'),
//   updateUserAvatarController.handle
// )

export { usersRoutes }