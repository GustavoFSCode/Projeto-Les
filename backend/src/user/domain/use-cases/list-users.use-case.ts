import { UseCase } from '@/common/domain/use-cases/use-case'
import { UserEntity } from '../entities/user.entity'
import { ListUsers } from '../gateway/list-users.gateway'

export class ListUsersUseCase implements UseCase<void, Array<UserEntity>> {
  public constructor(private readonly listUsers: ListUsers) {}

  async execute(input: void): Promise<UserEntity[]> {
    return await this.listUsers.listUsers()
  }
}
