import { UseCase } from '@/common/domain/use-cases/use-case'
import { InactivateUser } from '../gateway/inactivate-user.gateway'
import { GetUserByCode } from '../gateway/get-user-by-code.gateway'
import { AccountNotExistsError } from '../errors/account-not-exists.error'
import { MissingParamError } from '@/common/domain/use-cases/errors/missing-param.error'

interface Input {
  id: number
}

export class InactivateUserUseCase implements UseCase<Input, void> {
  public constructor(
    private readonly getUserByCode: GetUserByCode,
    private readonly inactiveUser: InactivateUser
  ) {}

  async execute(input: Input): Promise<void> {
    if (!input.id) {
      throw new MissingParamError('id')
    }

    if (!(await this.getUserByCode.getUserByCode(input.id))) {
      throw new AccountNotExistsError(input.id)
    }

    await this.inactiveUser.inactivateUser(input.id)
  }
}
