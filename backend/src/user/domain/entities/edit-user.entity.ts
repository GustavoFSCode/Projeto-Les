interface Parameters {
  id: number
  name: string
  gender: string
  email: string
  phoneNumber: string
}

export class EditUserEntity {
  private readonly _id: number
  private readonly _name: string
  private readonly _gender: string
  private readonly _email: string
  private readonly _phoneNumber: string

  public constructor(params: Parameters) {
    this._id = params.id
    this._name = params.name
    this._gender = params.gender
    this._email = params.email
    this._phoneNumber = params.phoneNumber
  }

  public get id(): number {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get gender(): string {
    return this._gender
  }

  public get email(): string {
    return this._email
  }

  public get phoneNumber(): string {
    return this._phoneNumber
  }
}
