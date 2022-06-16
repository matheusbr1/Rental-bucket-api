import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "../../../dtos/ICreateIUserTokenDTO";
import { IUsersTokensRespository } from "../../../repositories/IUsersTokensRepository";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRespository {
  private repository: Repository<UserTokens>

  constructor () {
    this.repository = getRepository(UserTokens)
  }

  async create({ 
    expires_date, 
    refresh_token, 
    user_id 
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date, 
      refresh_token, 
      user_id 
    })

    await this.repository.save(userToken)

    return userToken
  }
}

export { UsersTokensRepository }