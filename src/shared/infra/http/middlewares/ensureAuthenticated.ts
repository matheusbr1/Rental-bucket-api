import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../errors/AppError";
import { verify } from 'jsonwebtoken'
import { UserRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

export function ensureAutenticated (request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(token, '437b930db84b8079c2dd804a71936b5f')

    const usersRepository = new UserRepository()

    const user = usersRepository.findById(user_id as string)

    if(!user) {
      throw new AppError('User does not exists', 401)
    }
    
    request.user = {
      id: user_id as string
    }

    next()
  } catch (error) {
    throw new AppError('Invalid Token', 401)
  }
}