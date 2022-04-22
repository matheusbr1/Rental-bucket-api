import { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { AppError } from '../../../errors/AppError'

export async function handleError (
  err: Error, request: Request, response: Response, next: NextFunction
) {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  })
}