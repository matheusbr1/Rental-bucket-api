export class AppError {
  public readonly message: string
  public readonly context: string
  public readonly statusCode: number

  constructor(message: string, statusCode = 400, context = 'generic') {
    this.message = message
    this.statusCode = statusCode
    this.context = context
  }
}