import { inject, injectable } from "tsyringe"
import { compare } from 'bcryptjs'
import { AppError } from "../../../../shared/errors/AppError"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { sign } from 'jsonwebtoken'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
    avatar: string
  }
  token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if(!user) {
      throw new AppError('Email or password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch) {
      throw new AppError('Email or password incorrect')
    }

    const token = sign({}, "437b930db84b8079c2dd804a71936b5f", {
      subject: user.id,
      expiresIn: '1d'
    })

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }