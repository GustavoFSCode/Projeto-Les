import { UseCase } from '@/common/domain/use-cases/use-case'
import { UserEntity } from '../entities/user.entity'
import { GetUserByCode } from '../gateway/get-user-by-code.gateway'
import { ChangeUserPassword } from '../gateway/change-user-password.gateway'
import { MissingParamError } from '@/common/domain/use-cases/errors/missing-param.error'
import { InvalidParamError } from '@/common/domain/use-cases/errors/invalid-param.error'
import { AccountNotExistsError } from '../errors/account-not-exists.error'

interface Input {
  id: number
  originalPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export class ChangeUserPasswordUseCase implements UseCase<Input, UserEntity> {
  public constructor(
    private readonly getUserByCode: GetUserByCode,
    private readonly changeUserPassword: ChangeUserPassword
  ) {}

  private readonly requiredParams: string[] = [
    'id',
    'originalPassword',
    'newPassword',
    'newPasswordConfirmation'
  ]

  async execute(input: Input): Promise<UserEntity> {
    for (const param of this.requiredParams) {
      if (!input[param]) {
        throw new MissingParamError(param)
      }
    }

    const { id, originalPassword, newPassword, newPasswordConfirmation } = input

    if (newPassword !== newPasswordConfirmation) {
      throw new InvalidParamError('passwordConfirmation')
    }

    const userEntity = await this.getUserByCode.getUserByCode(id)

    if (!userEntity) {
      throw new AccountNotExistsError(id)
    }

    if (userEntity.password !== originalPassword) {
      throw new InvalidParamError('originalPassword')
    }

    return await this.changeUserPassword.changeUserPassword(
      userEntity.id,
      newPassword
    )
  }
}
