import { CustomError } from './custom.error'

export class InvalidParamError extends CustomError {
  public constructor(param: string) {
    super(`Invalid param: ${param}`, 400)
    this.name = 'InvalidParamError'
  }
}
