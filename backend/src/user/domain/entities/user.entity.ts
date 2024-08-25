interface Parameters {
  id: number
  name: string
  gender: string
  cpf: string
  birthDate: Date
  email: string
  password: string
  phoneNumber: string
}

export class UserEntity {
  private readonly _id: number
  private readonly _name: string
  private readonly _gender: string
  private readonly _cpf: string
  private readonly _birthDate: Date
  private readonly _email: string
  private readonly _password: string
  private readonly _phoneNumber: string

  public constructor(params: Parameters) {
    this._id = params.id
    this._name = params.name
    this._gender = params.gender
    this._cpf = params.cpf
    this._birthDate = params.birthDate
    this._email = params.email
    this._password = params.password
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

  public get cpf(): string {
    return this._cpf
  }

  public get birthDate(): Date {
    return this._birthDate
  }

  public get email(): string {
    return this._email
  }

  public get password(): string {
    return this._password
  }

  public get phoneNumber(): string {
    return this._phoneNumber
  }
}
