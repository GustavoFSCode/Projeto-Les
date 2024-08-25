import { UseCase } from '@/common/domain/use-cases/use-case'
import { UserEntity } from '../entities/user.entity'
import { MissingParamError } from '@/common/domain/use-cases/errors/missing-param.error'
import { AddUser } from '../gateway/add-user.gateway'
import { EmailValidator } from '@/common/domain/use-cases/gateway/email-validator.gateway'
import { InvalidParamError } from '@/common/domain/use-cases/errors/invalid-param.error'
import { CpfValidator } from '@/common/domain/use-cases/gateway/cpf-validator.gateway'
import { AddUserEntity } from '../entities/add-user.entity'
import { DateValidator } from '@/common/domain/use-cases/gateway/date-validator.gateway'

interface Input {
  name: string
  gender: string
  cpf: string
  birthDate: Date
  email: string
  password: string
  passwordConfirmation: string
  phoneNumber: string
}

export class AddUserUseCase implements UseCase<Input, UserEntity> {
  public constructor(
    private readonly emailValidator: EmailValidator,
    private readonly cpfValidator: CpfValidator,
    private readonly dateValidator: DateValidator,
    private readonly addUser: AddUser
  ) {}

  private readonly requiredParameters = [
    'name',
    'gender',
    'cpf',
    'birthDate',
    'email',
    'password',
    'passwordConfirmation',
    'phoneNumber'
  ]

  async execute(input: Input): Promise<UserEntity> {
    for (const param of this.requiredParameters) {
      if (!input[param]) {
        throw new MissingParamError(param)
      }
    }

    const {
      name,
      gender,
      cpf,
      birthDate,
      email,
      password,
      passwordConfirmation,
      phoneNumber
    } = input

    if (password !== passwordConfirmation) {
      throw new InvalidParamError(`passwordConfirmation`)
    }

    if (!this.cpfValidator.validate(cpf)) {
      throw new InvalidParamError(`cpf`)
    }

    if (!this.emailValidator.validate(email)) {
      throw new InvalidParamError(`email`)
    }

    if (!this.dateValidator.validate(birthDate)) {
      throw new InvalidParamError(`birthDate`)
    }

    const user = await this.addUser.addUser(
      new AddUserEntity({
        name,
        gender,
        cpf,
        birthDate,
        email,
        password,
        phoneNumber
      })
    )

    return user
  }
}
