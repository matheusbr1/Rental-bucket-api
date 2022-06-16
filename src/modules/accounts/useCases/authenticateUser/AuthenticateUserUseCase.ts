import { inject, injectable } from "tsyringe"
import { compare } from 'bcryptjs'
import { AppError } from "../../../../shared/errors/AppError"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { sign } from 'jsonwebtoken'
import { IUsersTokensRespository } from "../../repositories/IUsersTokensRepository"
import auth from "../../../../config/auth"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"

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
  refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRespository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
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

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token
    })

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id,
    })

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar
      },
      token,
      refresh_token
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }