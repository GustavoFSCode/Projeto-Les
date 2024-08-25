export class CustomError extends Error {
  private _statusCode: number

  public constructor(param: string, statusCode: number) {
    super(`Missing param: ${param}`)
    this._statusCode = statusCode
  }

  public get statusCode(): number {
    return this._statusCode
  }
}
