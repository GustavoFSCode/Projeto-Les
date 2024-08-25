import { CustomError } from './custom.error'

export class MissingParamError extends CustomError {
  public constructor(param: string) {
    super(`Missing param: ${param}`, 400)
    this.name = 'MissingParamError'
  }
}
