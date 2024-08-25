import { UseCase } from '@/common/domain/use-cases/use-case'
import { UserEntity } from '../entities/user.entity'
import { MissingParamError } from '@/common/domain/use-cases/errors/missing-param.error'
import { EmailValidator } from '@/common/domain/use-cases/gateway/email-validator.gateway'
import { InvalidParamError } from '@/common/domain/use-cases/errors/invalid-param.error'
import { GetUserByCode } from '../gateway/get-user-by-code.gateway'
import { AccountNotExistsError } from '../errors/account-not-exists.error'
import { EditUser } from '../gateway/edit-user.gateway'
import { EditUserEntity } from '../entities/edit-user.entity'

interface Input {
  id: number
  name: string
  gender: string
  email: string
  phoneNumber: string
}

export class EditUserUseCase implements UseCase<Input, UserEntity> {
  public constructor(
    private readonly getUserByCode: GetUserByCode,
    private readonly emailValidator: EmailValidator,
    private readonly editUser: EditUser
  ) {}

  private readonly requiredParameters = [
    'id',
    'name',
    'gender',
    'email',
    'phoneNumber'
  ]

  async execute(input: Input): Promise<UserEntity> {
    for (const param of this.requiredParameters) {
      if (!input[param]) {
        throw new MissingParamError(param)
      }
    }

    const { id, name, gender, email, phoneNumber } = input

    const userEntity = await this.getUserByCode.getUserByCode(id)

    if (!userEntity) {
      throw new AccountNotExistsError(id)
    }

    if (!this.emailValidator.validate(email)) {
      throw new InvalidParamError(`email`)
    }

    const user = await this.editUser.editUser(
      new EditUserEntity({
        id,
        name,
        gender,
        email,
        phoneNumber
      })
    )

    return user
  }
}
