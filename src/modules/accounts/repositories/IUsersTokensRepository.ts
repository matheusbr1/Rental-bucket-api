import { ICreateUserTokenDTO } from "../dtos/ICreateIUserTokenDTO"
import { UserTokens } from "../infra/typeorm/entities/UserTokens"

interface IUsersTokensRespository {
  create({ 
    expires_date, 
    refresh_token, 
    user_id 
  }: ICreateUserTokenDTO): Promise<UserTokens>
}

export { IUsersTokensRespository }