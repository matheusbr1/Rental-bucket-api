import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import auth from '../../../../config/auth'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/errors/AppError'
import { IUsersTokensRepository } from '../../repositories/IUsersTokensRepository'

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor (
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(old_refresh_token: string): Promise<ITokenResponse> {
    const { email, sub: user_id } = verify(old_refresh_token, auth.secret_refresh_token) as IPayload

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, old_refresh_token)

    if (!userToken) {
      throw new AppError('Refresh Token does not exists')
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const new_refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days)

    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token: new_refresh_token,
      user_id: user_id
    })

    const new_token = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return {
      refresh_token: new_refresh_token,
      token: new_token
    } 
  }
}

export { RefreshTokenUseCase }